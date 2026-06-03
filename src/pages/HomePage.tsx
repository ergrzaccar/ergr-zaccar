const stackItems = ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'Vitest', 'Playwright']

export function HomePage() {
  return (
    <section aria-labelledby="home-title" className="w-full">
      <div className="max-w-3xl space-y-6">
        <p className="text-sm font-medium uppercase text-cyan-700">Environnement initialisé</p>
        <h1 id="home-title" className="text-4xl font-semibold text-slate-950">
          Base prête
        </h1>
        <p className="max-w-2xl text-base leading-7 text-slate-700">
          Le projet est configuré pour commencer le développement React avec une structure claire,
          des outils de qualité et des tests prêts à être enrichis.
        </p>
        <ul className="grid max-w-2xl gap-3 sm:grid-cols-2" aria-label="Stack installée">
          {stackItems.map((item) => (
            <li key={item} className="rounded border border-slate-200 bg-white px-4 py-3 text-sm">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
