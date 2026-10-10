import { useMemo, useState } from "react";
import { hospitalizations, wardCapacity, type HospStatus, type Hospitalization } from "../data/mock";
import { Badge, Card } from "../components/ui";
import Icon from "../components/Icon";

const tone = (s: HospStatus) =>
  s === "Crítico" ? "red" : s === "Em observação" ? "amber" : s === "Estável" ? "green" : "blue";

export default function Hospital({ query }: { query: string }) {
  const [list, setList] = useState<Hospitalization[]>(hospitalizations);
  const [selected, setSelected] = useState<Hospitalization | null>(null);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return list.filter(
      (h) => !q || h.pet.toLowerCase().includes(q) || h.owner.toLowerCase().includes(q) || h.box.toLowerCase().includes(q),
    );
  }, [list, query]);

  const discharge = (id: string) => {
    setList((prev) => prev.filter((h) => h.id !== id));
    setSelected(null);
  };

  const totalUsed = wardCapacity.reduce((a, w) => a + w.used, 0);
  const totalBeds = wardCapacity.reduce((a, w) => a + w.total, 0);

  return (
    <div className="space-y-4 animate-fade-up sm:space-y-6">
      {/* Ocupação */}
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-5 sm:gap-4">
        <Card className="p-4">
          <p className="text-2xl font-extrabold text-stone-900">{totalUsed}/{totalBeds}</p>
          <p className="text-sm font-medium text-stone-600">Leitos ocupados</p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-stone-100">
            <div className="h-full rounded-full bg-brand-500" style={{ width: `${(totalUsed / totalBeds) * 100}%` }} />
          </div>
        </Card>
        {wardCapacity.map((w) => (
          <Card key={w.ward} className="p-4">
            <p className="text-2xl font-extrabold text-stone-900">{w.used}<span className="text-sm font-semibold text-stone-400">/{w.total}</span></p>
            <p className="text-sm font-medium text-stone-600">{w.ward}</p>
            <p className={`mt-1 text-xs font-bold ${w.used / w.total >= 0.75 ? "text-red-600" : "text-emerald-700"}`}>
              {w.used / w.total >= 0.75 ? "Quase cheio" : "Com vaga"}
            </p>
          </Card>
        ))}
      </div>

      <Card>
        <div className="flex items-center justify-between border-b border-stone-100 px-4 py-3 sm:px-5">
          <div>
            <h2 className="font-bold text-stone-900">Pacientes internados</h2>
            <p className="text-xs text-stone-500">Quadro ao vivo · sinais vitais, prescrições e passagem de plantão num lugar só</p>
          </div>
          <Badge tone="teal">{visible.length} internados</Badge>
        </div>
        <ul className="divide-y divide-stone-100">
          {visible.map((h) => (
            <li key={h.id} className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:px-5">
              <div className="flex items-center gap-3 sm:w-52 sm:shrink-0">
                <div className="rounded-xl bg-brand-900 px-2.5 py-1.5 text-center">
                  <p className="text-sm font-extrabold text-white">{h.box}</p>
                  <p className="text-[10px] font-bold text-emerald-300">{h.ward}</p>
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-stone-900">{h.pet} <span className="font-medium text-stone-400">· {h.species}</span></p>
                  <p className="truncate text-xs text-stone-500">{h.owner} · desde {h.admitted}</p>
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-stone-800">{h.diagnosis}</p>
                <p className="text-xs text-stone-500">
                  Temp {h.temp} · FC {h.heartRate} · {h.prescriptionsOpen} prescrições em aberto · {h.vet}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge tone={tone(h.status) as "red" | "amber" | "green" | "blue"}>{h.status}</Badge>
                <button
                  onClick={() => setSelected(h)}
                  className="rounded-xl bg-stone-900 px-3 py-1.5 text-xs font-bold text-white hover:bg-stone-700"
                >
                  Plantão
                </button>
              </div>
            </li>
          ))}
          {visible.length === 0 && <li className="p-10 text-center text-sm text-stone-500">Nada por aqui com esse filtro.</li>}
        </ul>
      </Card>

      {/* Passagem de plantão */}
      {selected && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={`Plantão de ${selected.pet}`}>
          <div className="absolute inset-0 bg-black/40" onClick={() => setSelected(null)} />
          <div className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-2xl animate-slide-in">
            <div className="bg-brand-900 p-5 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-lg font-extrabold">{selected.pet} · {selected.box}</p>
                  <p className="text-sm text-emerald-200">{selected.diagnosis}</p>
                </div>
                <button onClick={() => setSelected(null)} className="rounded-lg p-1.5 hover:bg-white/10" aria-label="Fechar">
                  <Icon name="x" className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto p-5 nice-scroll">
              <div className="grid grid-cols-3 gap-2 text-center text-sm">
                {[["Temp", selected.temp], ["Coração", selected.heartRate], ["Internado", selected.admitted]].map(([k, v]) => (
                  <div key={k} className="rounded-xl bg-sand-100/80 p-3">
                    <p className="text-[11px] font-bold text-stone-400 uppercase">{k}</p>
                    <p className="mt-0.5 truncate font-bold text-stone-800">{v}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
                <p className="text-xs font-bold text-amber-700 uppercase">Nota do plantão</p>
                <p className="mt-1 text-sm text-stone-700">{selected.shiftNote}</p>
              </div>
              <div className="rounded-xl border border-stone-200 p-3">
                <p className="text-xs font-bold text-stone-400 uppercase">Prescrições</p>
                <p className="mt-1 text-sm text-stone-700">
                  {selected.prescriptionsOpen === 0
                    ? "Todas as prescrições aplicadas."
                    : `${selected.prescriptionsOpen} prescrições para aplicar — veja os horários no quadro da ala.`}
                </p>
              </div>
              <div className="rounded-xl border border-stone-200 p-3">
                <p className="text-xs font-bold text-stone-400 uppercase">Tutor por dentro</p>
                <p className="mt-1 text-sm text-stone-700">
                  {selected.owner} recebe atualização automática no WhatsApp a cada troca de plantão — já vem no sistema, sem módulo à parte.
                </p>
              </div>
            </div>
            <div className="border-t border-stone-200 p-4">
              <button
                onClick={() => discharge(selected.id)}
                className="w-full rounded-xl bg-emerald-600 py-2.5 text-sm font-bold text-white hover:bg-emerald-700"
              >
                Dar alta para {selected.pet}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
