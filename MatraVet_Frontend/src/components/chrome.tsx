import Icon from "./Icon";
import { NAV_SECTIONS, type PageKey } from "./navigation";

export function Sidebar({
  active,
  onNavigate,
  open,
  onClose,
}: {
  active: PageKey;
  onNavigate: (p: PageKey) => void;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-30 bg-black/30 lg:hidden" onClick={onClose} aria-hidden="true" />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-brand-900 text-white transition-transform duration-200 lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-3 px-5 pt-6 pb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20">
            <Icon name="paw" className="h-6 w-6 text-emerald-200" />
          </div>
          <div>
            <p className="text-lg font-extrabold tracking-tight">MatraVet</p>
            <p className="text-xs text-emerald-200/80">Clínica · Hospital · Pet Shop · Banho & Tosa</p>
          </div>
          <button
            className="ml-auto rounded-lg p-1.5 hover:bg-white/10 lg:hidden"
            onClick={onClose}
            aria-label="Fechar menu"
          >
            <Icon name="x" className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-4 overflow-y-auto px-3 nice-scroll" aria-label="Primary">
          {NAV_SECTIONS.map((section) => (
            <div key={section.title}>
              <p className="px-3 pb-1 text-[11px] font-extrabold tracking-wider text-emerald-200/60 uppercase">
                {section.title}
                <span className="ml-1.5 font-semibold normal-case opacity-70">· {section.module}</span>
              </p>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = active === item.key;
                  return (
                    <button
                      key={item.key}
                      onClick={() => {
                        onNavigate(item.key);
                        onClose();
                      }}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                        isActive ? "bg-white text-brand-900 shadow" : "text-emerald-50/90 hover:bg-white/10 hover:text-white"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <Icon name={item.icon} className={`h-5 w-5 ${isActive ? "text-brand-700" : "text-emerald-200"}`} />
                      {item.label}
                      {item.badge && (
                        <span
                          className={`ml-auto rounded-full px-2 py-0.5 text-xs font-bold ${
                            isActive ? "bg-brand-100 text-brand-800" : "bg-white/15 text-white"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="m-3 rounded-2xl bg-white/10 p-4 ring-1 ring-white/15">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Icon name="alert" className="h-4 w-4 text-amber-300" />
            3 vacinas atrasadas
          </div>
          <p className="mt-1 text-xs text-emerald-100/80">Envie lembretes para manter a cobertura em 100%.</p>
          <button
            onClick={() => {
              onNavigate("vaccines");
              onClose();
            }}
            className="mt-3 w-full rounded-xl bg-white px-3 py-2 text-sm font-bold text-brand-900 hover:bg-emerald-50"
          >
            Ver vacinas
          </button>
        </div>

        <div className="flex items-center gap-3 border-t border-white/10 px-5 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-300 font-bold text-brand-900">
            M
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">Dra. Marina Costa</p>
            <p className="text-xs text-emerald-200/70">Veterinária · Admin</p>
          </div>
        </div>
      </aside>
    </>
  );
}

export function Topbar({
  title,
  subtitle,
  onMenu,
  query,
  onQuery,
  onQuickAdd,
}: {
  title: string;
  subtitle: string;
  onMenu: () => void;
  query: string;
  onQuery: (q: string) => void;
  onQuickAdd: () => void;
}) {
  return (
    <header className="sticky top-0 z-20 border-b border-stone-200/70 bg-sand-50/90 backdrop-blur">
      <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
        <button
          onClick={onMenu}
          className="rounded-xl border border-stone-200 bg-white p-2 lg:hidden"
          aria-label="Abrir menu"
        >
          <Icon name="menu" className="h-5 w-5" />
        </button>
        <div className="min-w-0">
          <h1 className="truncate text-lg font-extrabold tracking-tight text-stone-900 sm:text-xl">{title}</h1>
          <p className="hidden truncate text-sm text-stone-500 sm:block">{subtitle}</p>
        </div>
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <label className="relative hidden md:block">
            <Icon name="search" className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <input
              value={query}
              onChange={(e) => onQuery(e.target.value)}
              placeholder="Buscar pets, tutores…"
              className="w-64 rounded-xl border border-stone-200 bg-white py-2 pr-3 pl-9 text-sm outline-none placeholder:text-stone-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </label>
          <button
            className="relative rounded-xl border border-stone-200 bg-white p-2.5 hover:bg-stone-50"
            aria-label="Notificações"
          >
            <Icon name="bell" className="h-5 w-5 text-stone-600" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>
          <button onClick={onQuickAdd} className="hidden rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-brand-800 sm:flex sm:items-center sm:gap-2">
            <Icon name="plus" className="h-4 w-4" />
            Novo agendamento
          </button>
        </div>
      </div>
      <div className="px-4 pb-3 md:hidden">
        <label className="relative block">
          <Icon name="search" className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Buscar pets, tutores…"
            className="w-full rounded-xl border border-stone-200 bg-white py-2 pr-3 pl-9 text-sm outline-none placeholder:text-stone-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
          />
        </label>
      </div>
    </header>
  );
}
