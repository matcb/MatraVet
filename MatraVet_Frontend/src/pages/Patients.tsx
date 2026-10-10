import { useMemo, useState } from "react";
import { medHistory, patients, type Patient, type Species } from "../data/mock";
import { Badge, Card } from "../components/ui";
import Icon from "../components/Icon";

const speciesTabs = ["Todos", "Cão", "Gato", "Ave", "Coelho"] as const;

const statusTone = (s: Patient["status"]) =>
  s === "Saudável" ? "green" : s === "Crítico" ? "red" : s === "Em tratamento" ? "amber" : "blue";

const tabLabels = { overview: "Resumo", history: "Histórico", vaccines: "Vacinas" } as const;
type Tab = keyof typeof tabLabels;

export default function Patients({ query }: { query: string }) {
  const [species, setSpecies] = useState<(typeof speciesTabs)[number]>("Todos");
  const [selected, setSelected] = useState<Patient | null>(null);
  const [tab, setTab] = useState<Tab>("overview");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return patients.filter(
      (p) =>
        (species === "Todos" || p.species === (species as Species)) &&
        (!q || p.name.toLowerCase().includes(q) || p.owner.toLowerCase().includes(q) || p.breed.toLowerCase().includes(q)),
    );
  }, [query, species]);

  return (
    <div className="animate-fade-up">
      <div className="flex flex-wrap gap-2">
        {speciesTabs.map((s) => (
          <button
            key={s}
            onClick={() => setSpecies(s)}
            className={`rounded-full px-3.5 py-1.5 text-sm font-semibold ring-1 ring-inset ${
              species === s ? "bg-brand-700 text-white ring-brand-700" : "bg-white text-stone-600 ring-stone-200 hover:bg-stone-50"
            }`}
          >
            {s}
          </button>
        ))}
        <span className="ml-auto text-sm text-stone-500">{visible.length} pacientes</span>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
        {visible.map((p) => (
          <Card key={p.id} className="p-4 transition-shadow hover:shadow-md">
            <div className="flex items-start gap-3">
              <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-lg font-extrabold text-white ${p.avatarColor}`}>
                {p.name[0]}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate font-extrabold text-stone-900">{p.name}</p>
                  <Badge tone={statusTone(p.status) as "green" | "red" | "amber" | "blue"}>{p.status}</Badge>
                </div>
                <p className="truncate text-sm text-stone-500">{p.breed} · {p.age} · {p.weight}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 border-t border-stone-100 pt-3 text-sm">
              <Icon name="users" className="h-4 w-4 text-stone-400" />
              <span className="truncate font-medium text-stone-700">{p.owner}</span>
              <span className="ml-auto shrink-0 text-xs text-stone-400">{p.lastVisit}</span>
            </div>
            <button
              onClick={() => { setSelected(p); setTab("overview"); }}
              className="mt-3 w-full rounded-xl bg-stone-900 py-2 text-sm font-bold text-white hover:bg-stone-700"
            >
              Abrir prontuário
            </button>
          </Card>
        ))}
      </div>
      {visible.length === 0 && (
        <Card className="mt-4 p-12 text-center">
          <p className="font-bold text-stone-800">Nenhum paciente bate com a busca</p>
          <p className="text-sm text-stone-500">Tente outro nome, raça ou tutor.</p>
        </Card>
      )}

      {/* Prontuário */}
      {selected && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={`Prontuário de ${selected.name}`}>
          <div className="absolute inset-0 bg-black/40" onClick={() => setSelected(null)} />
          <div className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-2xl animate-slide-in">
            <div className="bg-brand-900 p-5 text-white">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className={`flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-extrabold text-white ${selected.avatarColor}`}>
                    {selected.name[0]}
                  </span>
                  <div>
                    <p className="text-lg font-extrabold">{selected.name}</p>
                    <p className="text-sm text-emerald-200">{selected.species} · {selected.breed} · {selected.gender}</p>
                  </div>
                </div>
                <button onClick={() => setSelected(null)} className="rounded-lg p-1.5 hover:bg-white/10" aria-label="Fechar prontuário">
                  <Icon name="x" className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-4 flex gap-2">
                {(Object.keys(tabLabels) as Tab[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`rounded-lg px-3 py-1.5 text-sm font-bold capitalize ${tab === t ? "bg-white text-brand-900" : "bg-white/10 text-white hover:bg-white/20"}`}
                  >
                    {tabLabels[t]}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 nice-scroll">
              {tab === "overview" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {[["Idade", selected.age], ["Peso", selected.weight], ["Tutor", selected.owner], ["Telefone", selected.phone], ["Última visita", selected.lastVisit], ["Próxima visita", selected.nextVisit]].map(([k, v]) => (
                      <div key={k} className="rounded-xl bg-sand-100/80 p-3">
                        <p className="text-xs font-bold text-stone-400 uppercase">{k}</p>
                        <p className="mt-0.5 truncate font-bold text-stone-800">{v}</p>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl border border-stone-200 p-3">
                    <p className="text-xs font-bold text-stone-400 uppercase">Notas clínicas</p>
                    <p className="mt-1 text-sm text-stone-700">{selected.notes}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="phone" className="h-4 w-4 text-brand-700" />
                    <span className="font-semibold">{selected.phone}</span>
                    <Icon name="mail" className="ml-3 h-4 w-4 text-brand-700" />
                    <span className="font-semibold">Chamar o tutor</span>
                  </div>
                </div>
              )}
              {tab === "history" && (
                <ul className="space-y-3">
                  {(medHistory[selected.id] ?? [{ date: selected.lastVisit, title: "Consulta de rotina", vet: "Dra. Marina Costa", details: "Sinais vitais normais. Nada digno de nota." }]).map((m, i) => (
                    <li key={i} className="rounded-xl border border-stone-200 p-3">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-bold text-stone-900">{m.title}</p>
                        <span className="shrink-0 text-xs text-stone-400">{m.date}</span>
                      </div>
                      <p className="text-xs font-semibold text-brand-700">{m.vet}</p>
                      <p className="mt-1 text-sm text-stone-600">{m.details}</p>
                    </li>
                  ))}
                </ul>
              )}
              {tab === "vaccines" && (
                <div className="space-y-3">
                  <div className={`flex items-center gap-3 rounded-xl p-3 ring-1 ${selected.vaccineUpToDate ? "bg-emerald-50 ring-emerald-200" : "bg-amber-50 ring-amber-200"}`}>
                    <Icon name="syringe" className={`h-5 w-5 ${selected.vaccineUpToDate ? "text-emerald-700" : "text-amber-700"}`} />
                    <div>
                      <p className="text-sm font-bold">{selected.vaccineUpToDate ? "Vacinas em dia" : "Reforço atrasado"}</p>
                      <p className="text-xs text-stone-500">{selected.vaccineUpToDate ? "Próximo reforço em " + selected.nextVisit : "Agende o reforço o quanto antes."}</p>
                    </div>
                  </div>
                  {["Polivalente V8 — aplicada em set/2026", "Antirrábica — " + (selected.vaccineUpToDate ? "aplicada em set/2026" : "ATRASADA"), "Bordetella — prevista para nov/2026"].map((v) => (
                    <div key={v} className="flex items-center gap-2 rounded-xl border border-stone-200 p-3 text-sm">
                      <Icon name="check" className="h-4 w-4 text-emerald-600" />
                      <span className="font-medium text-stone-700">{v}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-stone-200 p-4">
              <button className="w-full rounded-xl bg-brand-700 py-2.5 text-sm font-bold text-white hover:bg-brand-800">
                Agendar retorno da {selected.name}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
