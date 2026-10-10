import { groomPackages, hospitalizations, patients, recentSales, vaccinesDue, type Appointment, type GroomAppointment } from "../data/mock";
import { Badge, Card } from "../components/ui";
import Icon from "../components/Icon";
import type { PageKey } from "../components/navigation";

export default function Dashboard({
  query,
  onOpen,
  clinic,
  grooming,
}: {
  query: string;
  onOpen: (p: PageKey) => void;
  clinic: Appointment[];
  grooming: GroomAppointment[];
}) {
  const MODULES: { key: PageKey; title: string; icon: string; kpi: string; detail: string; cta: string; accent: string }[] = [
    { key: "appointments", title: "Clínica Veterinária", icon: "stethoscope", kpi: `${clinic.length} visitas hoje`, detail: "2 vets de plantão · 1 urgente", cta: "Abrir agenda", accent: "bg-brand-600" },
    { key: "hospital", title: "Hospital Veterinário", icon: "hospital", kpi: "5 internados", detail: "1 crítico · 1 com alta liberada", cta: "Abrir mapa de leitos", accent: "bg-red-500" },
    { key: "pos", title: "Pet Shop", icon: "cart", kpi: "R$ 980 hoje", detail: "3 vendas · tíquete médio R$ 122", cta: "Abrir PDV", accent: "bg-amber-500" },
    { key: "grooming", title: "Banho & Tosa", icon: "scissors", kpi: `${grooming.length} atendimentos hoje`, detail: "3 pacotes ativos · 2 profissionais", cta: "Abrir banho & tosa", accent: "bg-sky-500" },
  ];

  const q = query.trim().toLowerCase();
  const appts = clinic.filter(
    (a) => !q || a.pet.toLowerCase().includes(q) || a.owner.toLowerCase().includes(q),
  );
  const critical = patients.filter((p) => p.status === "Crítico");
  const overdueVaccines = vaccinesDue.filter((v) => v.status === "Atrasada");

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-up">
      {/* Faixa todos-os-módulos */}
      <div className="overflow-hidden rounded-2xl bg-brand-900 p-5 text-white sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex-1">
            <p className="text-xs font-bold tracking-widest text-emerald-300 uppercase">Um sistema só · 4 módulos · sem taxa extra</p>
            <h2 className="mt-1 text-xl font-extrabold tracking-tight sm:text-2xl">
              Clínica, Hospital, Pet Shop e Banho & Tosa — juntos.
            </h2>
            <p className="mt-1 max-w-xl text-sm text-emerald-100/80">
              Internação, nota fiscal e automação de WhatsApp já inclusos — o que por aí costuma ser cobrado à parte.
            </p>
          </div>
          <div className="flex gap-6 sm:gap-8">
            <div className="text-center"><p className="text-2xl font-extrabold">12</p><p className="text-xs text-emerald-200">visitas hoje</p></div>
            <div className="text-center"><p className="text-2xl font-extrabold">R$ 4,7 mil</p><p className="text-xs text-emerald-200">faturado hoje</p></div>
          </div>
        </div>
      </div>

      {/* Cards dos 4 módulos */}
      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
        {MODULES.map((m) => (
          <Card key={m.key} className="overflow-hidden">
            <div className={`flex items-center gap-2 px-4 pt-3 text-white`}>
              <span className={`flex items-center gap-2 rounded-xl ${m.accent} px-3 py-1.5 text-sm font-bold`}>
                <Icon name={m.icon} className="h-4 w-4" /> {m.title}
              </span>
            </div>
            <div className="p-4">
              <p className="text-xl font-extrabold text-stone-900">{m.kpi}</p>
              <p className="text-xs text-stone-500">{m.detail}</p>
              <button
                onClick={() => onOpen(m.key)}
                className="mt-3 w-full rounded-xl bg-stone-900 py-2 text-sm font-bold text-white hover:bg-stone-700"
              >
                {m.cta}
              </button>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-3 sm:gap-6">
        {/* Agenda */}
        <Card className="xl:col-span-2">
          <div className="flex items-center justify-between border-b border-stone-100 px-4 py-3 sm:px-5">
            <div>
              <h2 className="font-bold text-stone-900">Hoje em todos os módulos</h2>
              <p className="text-xs text-stone-500">Consultas · banho & tosa · altas previstas</p>
            </div>
            <Badge tone="teal">{appts.length} visitas</Badge>
          </div>
          <ul className="divide-y divide-stone-100">
            {appts.slice(0, 6).map((a) => (
              <li key={a.id} className="flex items-center gap-3 px-4 py-3 sm:px-5">
                <div className="w-12 shrink-0 rounded-lg bg-stone-100 py-1 text-center text-xs font-extrabold text-stone-700">{a.time}</div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">{a.pet} <span className="font-medium text-stone-400">· {a.owner}</span></p>
                  <p className="truncate text-xs text-stone-500">{a.reason} · {a.room}</p>
                </div>
                <Badge tone={a.status === "Urgente" ? "red" : a.status === "Em atendimento" ? "blue" : a.status === "Concluído" ? "green" : "teal"}>{a.status}</Badge>
              </li>
            ))}
          </ul>
          <button onClick={() => onOpen("appointments")} className="w-full border-t border-stone-100 py-2.5 text-sm font-bold text-brand-700 hover:bg-brand-50">
            Ver agenda completa →
          </button>
        </Card>

        <div className="space-y-4 sm:space-y-6">
          <Card className="p-4 sm:p-5">
            <h2 className="flex items-center gap-2 font-bold text-stone-900">
              <Icon name="alert" className="h-4 w-4 text-red-500" /> Críticos agora
            </h2>
            {critical.map((p) => (
              <button key={p.id} onClick={() => onOpen("hospital")} className="mt-2 flex w-full items-center gap-3 rounded-xl bg-red-50 p-3 text-left ring-1 ring-red-100 hover:bg-red-100/70">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500 text-sm font-extrabold text-white">{p.name[0]}</span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold">{p.name} · UTI-1</span>
                  <span className="block truncate text-xs text-stone-500">{p.notes}</span>
                </span>
              </button>
            ))}
            <button onClick={() => onOpen("hospital")} className="mt-2 flex w-full items-center gap-3 rounded-xl bg-sand-100/70 p-3 text-left hover:bg-sand-100">
              <Icon name="hospital" className="h-5 w-5 text-brand-700" />
              <span className="text-sm font-semibold text-stone-700">{hospitalizations.length} internados · 1 com alta liberada</span>
            </button>
          </Card>

          <Card className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-stone-900">Dinheiro de hoje</h2>
              <button onClick={() => onOpen("finance")} className="text-xs font-bold text-brand-700 hover:underline">Financeiro →</button>
            </div>
            <ul className="mt-2 space-y-1.5 text-sm">
              {[["Clínica", "R$ 2.140"], ["Pet shop", "R$ 980"], ["Banho & tosa", "R$ 640"]].map(([k, v]) => (
                <li key={k} className="flex justify-between"><span className="text-stone-500">{k}</span><span className="font-extrabold">{v}</span></li>
              ))}
              <li className="flex justify-between border-t border-stone-100 pt-1.5 font-extrabold"><span>Total</span><span>R$ 3.760</span></li>
            </ul>
            <p className="mt-2 truncate text-xs text-stone-400">Última venda: {recentSales[0].client} · {recentSales[0].total}</p>
          </Card>

          <Card className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-stone-900">Vacinas atrasadas</h2>
              <button onClick={() => onOpen("vaccines")} className="text-xs font-bold text-brand-700 hover:underline">Ver radar →</button>
            </div>
            <p className="mt-1 text-sm text-stone-600"><strong className="text-red-700">{overdueVaccines.length} pets</strong> com atraso · {groomPackages.length} pacotes de banho ativos</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
