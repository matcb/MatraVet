import { useMemo, useState } from "react";
import { vaccineProtocols, vaccinesDue } from "../data/mock";
import { Badge, Card } from "../components/ui";
import Icon from "../components/Icon";

const tone = (s: string) => (s === "Atrasada" ? "red" : s === "Vence esta semana" ? "amber" : "neutral");

export default function Vaccines({ query }: { query: string }) {
  const [reminded, setReminded] = useState<string[]>([]);
  const q = query.trim().toLowerCase();
  const visible = useMemo(
    () =>
      vaccinesDue.filter(
        (v) => !q || v.pet.toLowerCase().includes(q) || v.owner.toLowerCase().includes(q) || v.vaccine.toLowerCase().includes(q),
      ),
    [q],
  );
  const overdue = vaccinesDue.filter((v) => v.status === "Atrasada").length;
  const dueWeek = vaccinesDue.filter((v) => v.status === "Vence esta semana").length;

  return (
    <div className="space-y-4 animate-fade-up sm:space-y-6">
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {[
          ["Atrasadas", String(overdue), "text-red-700 bg-red-50 ring-red-200"],
          ["Vencem esta semana", String(dueWeek), "text-amber-700 bg-amber-50 ring-amber-200"],
          ["Protocolos ativos", String(vaccineProtocols.length), "text-brand-700 bg-brand-50 ring-brand-200"],
        ].map(([k, v, cls]) => (
          <Card key={k} className="p-4 text-center">
            <p className={`mx-auto w-fit rounded-full px-2.5 py-0.5 text-xs font-bold ring-1 ring-inset ${cls}`}>{k}</p>
            <p className="mt-2 text-2xl font-extrabold text-stone-900">{v}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-5 sm:gap-6">
        <Card className="xl:col-span-3">
          <div className="border-b border-stone-100 px-4 py-3 sm:px-5">
            <h2 className="font-bold text-stone-900">Radar de vacinação</h2>
            <p className="text-xs text-stone-500">Quem precisa vacinar — e lembrete no WhatsApp em um toque</p>
          </div>
          <ul className="divide-y divide-stone-100">
            {visible.map((v) => (
              <li key={`${v.pet}-${v.vaccine}`} className="flex items-center gap-3 px-4 py-3 sm:px-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100">
                  <Icon name="syringe" className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-stone-900">{v.pet} <span className="font-medium text-stone-400">· {v.owner}</span></p>
                  <p className="truncate text-xs text-stone-500">{v.vaccine} · vence {v.due}</p>
                </div>
                <Badge tone={tone(v.status) as "red" | "amber" | "neutral"}>{v.status}</Badge>
                <button
                  onClick={() => setReminded((p) => [...p, v.pet + v.vaccine])}
                  disabled={reminded.includes(v.pet + v.vaccine)}
                  className="shrink-0 rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-700 disabled:opacity-40"
                >
                  {reminded.includes(v.pet + v.vaccine) ? "Enviado ✓" : "Lembrar"}
                </button>
              </li>
            ))}
            {visible.length === 0 && <li className="p-10 text-center text-sm text-stone-500">Tudo em dia por aqui.</li>}
          </ul>
        </Card>

        <Card className="p-4 xl:col-span-2 sm:p-5">
          <h2 className="font-bold text-stone-900">Protocolos de vacina</h2>
          <p className="text-xs text-stone-500">Esquemas com várias doses geram os vencimentos sozinhos</p>
          <ul className="mt-3 space-y-2.5">
            {vaccineProtocols.map((p) => (
              <li key={p.name} className="rounded-xl border border-stone-200 p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-bold text-stone-900">{p.name}</p>
                  <Badge tone="teal">{p.species}</Badge>
                </div>
                <p className="mt-1 text-xs text-stone-500">{p.doses} · {p.interval} · {p.petsOnProtocol} pets no protocolo</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
