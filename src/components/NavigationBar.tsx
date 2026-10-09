import { routes } from './Dock';

export default function NavigationBar({ path }: { path: string }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-[color-mix(in_srgb,var(--bg)_80%,transparent)] backdrop-blur-md">
      <nav className="mx-auto flex max-w-[680px] items-center justify-between px-6 py-4" aria-label="Site">
        <a href="/" className="font-bold tracking-tight">sg.</a>
        <ul className="hidden items-center gap-6 text-sm sm:flex">
          {routes.map((r) => (
            <li key={r.path}><a href={r.path} className={'topnav' + (path === r.path ? ' on' : '')}>{r.label}</a></li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
