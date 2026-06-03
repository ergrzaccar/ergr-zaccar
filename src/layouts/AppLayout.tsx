import type { PropsWithChildren } from 'react'

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950 antialiased">
      <div className="mx-auto flex min-h-screen w-full max-w-5xl items-center px-6 py-12">
        {children}
      </div>
    </main>
  )
}
