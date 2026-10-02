export default function NavigationBar() {
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <nav className="mx-auto flex max-w-[680px] items-center justify-between px-6 py-5" aria-label="Primary">
        <a href="#top" className="text-sm font-medium tracking-tight">sg.</a>
        <span className="mono hidden text-[var(--dim)] sm:inline">backend / systems / web</span>
      </nav>
    </header>
  );
}
