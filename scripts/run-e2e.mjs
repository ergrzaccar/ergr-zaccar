import { spawn, spawnSync } from 'node:child_process'
import { once } from 'node:events'
import { setTimeout as delay } from 'node:timers/promises'
import { fileURLToPath } from 'node:url'

const projectRoot = fileURLToPath(new URL('..', import.meta.url))
const serverUrl = 'http://127.0.0.1:5173'
const viteCli = fileURLToPath(new URL('../node_modules/vite/bin/vite.js', import.meta.url))
const playwrightCli = fileURLToPath(
  new URL('../node_modules/@playwright/test/cli.js', import.meta.url),
)

let isStopping = false

const server = spawn(
  process.execPath,
  [viteCli, '--host', '127.0.0.1', '--port', '5173', '--strictPort'],
  {
    cwd: projectRoot,
    env: {
      ...process.env,
      BROWSER: 'none',
      FORCE_COLOR: '1',
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  },
)

server.stdout.pipe(process.stdout)
server.stderr.pipe(process.stderr)

server.once('exit', (code) => {
  if (!isStopping && code !== 0) {
    console.error(`Vite exited before Playwright finished (code ${code ?? 'unknown'}).`)
  }
})

async function waitForServer(url, timeoutMs = 30_000) {
  const deadline = Date.now() + timeoutMs
  let lastError

  while (Date.now() < deadline) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(1_000) })

      if (response.status < 500) {
        return
      }
    } catch (error) {
      lastError = error
    }

    await delay(250)
  }

  const details = lastError instanceof Error ? ` Last error: ${lastError.message}` : ''
  throw new Error(`Vite did not respond at ${url} within ${timeoutMs}ms.${details}`)
}

async function stopServer() {
  if (!server.pid || server.exitCode !== null) {
    return
  }

  isStopping = true

  if (process.platform === 'win32') {
    spawnSync('taskkill', ['/pid', String(server.pid), '/T', '/F'], { stdio: 'ignore' })
  } else {
    server.kill('SIGTERM')
  }

  await Promise.race([once(server, 'exit'), delay(5_000)])

  if (server.exitCode === null) {
    server.kill('SIGKILL')
  }
}

async function run() {
  try {
    await Promise.race([
      waitForServer(serverUrl),
      once(server, 'exit').then(([code]) => {
        throw new Error(`Vite exited before it became available (code ${code ?? 'unknown'}).`)
      }),
    ])

    const playwright = spawn(process.execPath, [playwrightCli, 'test'], {
      cwd: projectRoot,
      env: process.env,
      stdio: 'inherit',
    })

    const [code] = await once(playwright, 'exit')
    process.exitCode = code ?? 1
  } finally {
    await stopServer()
  }
}

run().catch(async (error) => {
  console.error(error)
  process.exitCode = 1
  await stopServer()
})
