import { useMemo, useState } from "react";
import { groomPackages, type GroomAppointment, type GroomStatus } from "../data/mock";
import { Badge, Card } from "../components/ui";
import Icon from "../components/Icon";

const tone = (s: GroomStatus) => (s === "Concluído" ? "green" : s === "Em atendimento" ? "blue" : "neutral");

const next = (s: GroomStatus): GroomStatus | null =>
  s === "Na fila" ? "Em atendimento" : s === "Em atendimento" ? "Concluído" : null;

export default function Grooming({
  query,
  agenda,
  onAdvance,
  onNew,
}: {
  query: string;
  agenda: GroomAppointment[];
  onAdvance: (id: string) => void;
  onNew: () => void;
}) {
  const [checklist, setChecklist] = useState<GroomAppointment | null>(null);
  const [checks, setChecks] = useState<string[]>([]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return agenda.filter(
      (g) => !q || g.pet.toLowerCase().includes(q) || g.owner.toLowerCase().includes(q) || g.groomer.toLowerCase().includes(q),
    );
  }, [agenda, query]);

  const done = agenda.filter((g) => g.status === "Concluído").length;

  return (
    <div className="space-y-4 animate-fade-up sm:space-y-6">
      <div className="flex items-center gap-2">
        <h2 className="font-bold text-stone-900">Como agendar</h2>
        <span className="text-xs text-stone-500">Toque em “Novo agendamento” → escolha serviço e profissional → o pet entra na fila abaixo</span>
        <button
          onClick={onNew}
          className="ml-auto flex shrink-0 items-center gap-2 rounded-xl bg-sky-600 px-4 py-2 text-sm font-bold text-white hover:bg-sky-700"
        >
          <Icon name="plus" className="h-4 w-4" /> Novo agendamento
        </button>
      </div>
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {[
          ["Na fila", String(agenda.filter((g) => g.status === "Na fila").length)],
          ["Em atendimento", String(agenda.filter((g) => g.status === "Em atendimento").length)],
          ["Concluídos hoje", String(done)],
        ].map(([k, v]) => (
          <Card key={k} className="p-4 text-center">
            <p className="text-2xl font-extrabold text-stone-900">{v}</p>
            <p className="text-sm font-medium text-stone-500">{k}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-5 sm:gap-6">
        <Card className="xl:col-span-3">
          <div className="border-b border-stone-100 px-4 py-3 sm:px-5">
            <h2 className="font-bold text-stone-900">Agenda de hoje</h2>
            <p className="text-xs text-stone-500">Fila por profissional · check-list por pet · recado pronto pro WhatsApp</p>
          </div>
          <ul className="divide-y divide-stone-100">
            {visible.map((g) => (
              <li key={g.id} className="flex flex-col gap-2 px-4 py-3.5 sm:flex-row sm:items-center sm:px-5">
                <div className="w-14 shrink-0 rounded-lg bg-stone-100 py-1 text-center text-xs font-extrabold text-stone-700">{g.time}</div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-stone-900">{g.pet} <span className="font-medium text-stone-400">· {g.breed}</span></p>
                  <p className="truncate text-xs text-stone-500">{g.service} · {g.groomer}</p>
                  <p className="truncate text-xs text-stone-400 italic">“{g.notes}”</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge tone={tone(g.status) as "green" | "blue" | "neutral"}>{g.status}</Badge>
                  <button
                    onClick={() => { setChecklist(g); setChecks([]); }}
                    className="rounded-lg bg-sky-50 p-1.5 text-sky-700 ring-1 ring-sky-200 hover:bg-sky-100"
                    title="Abrir check-list"
                    aria-label={`Check-list de ${g.pet}`}
                  >
                    <Icon name="check" className="h-4 w-4" />
                  </button>
                  {next(g.status) && (
                    <button
                      onClick={() => onAdvance(g.id)}
                      className="rounded-xl bg-brand-700 px-3 py-1.5 text-xs font-bold text-white hover:bg-brand-800"
                    >
                      → {next(g.status)}
                    </button>
                  )}
                </div>
              </li>
            ))}
            {visible.length === 0 && <li className="p-10 text-center text-sm text-stone-500">Nenhum atendimento bate com a busca.</li>}
          </ul>
        </Card>

        <Card className="p-4 xl:col-span-2 sm:p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-stone-900">Pacotes de banho e tosa</h2>
              <p className="text-xs text-stone-500">Planos ativos · consumo · economia na tela pro tutor ver</p>
            </div>
          </div>
          <ul className="mt-3 space-y-3">
            {groomPackages.map((p) => (
              <li key={p.id} className="rounded-xl border border-stone-200 p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-bold text-stone-900">{p.pet} <span className="font-medium text-stone-400">· {p.client}</span></p>
                  <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700">{p.savings}</span>
                </div>
                <p className="mt-0.5 text-xs text-stone-500">{p.plan} · vence {p.expires}</p>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-stone-100">
                  <div className="h-full rounded-full bg-brand-500" style={{ width: `${(p.used / p.total) * 100}%` }} />
                </div>
                <p className="mt-1 text-xs font-semibold text-stone-600">{p.used} de {p.total} usados</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {checklist && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-label="Check-list do banho">
          <div className="w-full max-w-md rounded-t-3xl bg-white p-5 sm:rounded-3xl sm:p-6 animate-fade-up">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold">Check-list · {checklist.pet}</h2>
              <button onClick={() => setChecklist(null)} className="rounded-lg p-1.5 hover:bg-stone-100" aria-label="Fechar">
                <Icon name="x" className="h-5 w-5" />
              </button>
            </div>
            <ul className="mt-4 space-y-2">
              {["Pelagem avaliada", "Problema de pele anotado", "Corte combinado com o tutor", "Shampoo registrado", "Foto do antes/depois anexada"].map((c) => (
                <li key={c}>
                  <button
                    onClick={() => setChecks((p) => (p.includes(c) ? p.filter((x) => x !== c) : [...p, c]))}
                    className={`flex w-full items-center gap-3 rounded-xl border p-3 text-sm font-medium ${checks.includes(c) ? "border-emerald-300 bg-emerald-50 text-emerald-900" : "border-stone-200 text-stone-700"}`}
                    aria-pressed={checks.includes(c)}
                  >
                    <span className={`flex h-5 w-5 items-center justify-center rounded-full ${checks.includes(c) ? "bg-emerald-500 text-white" : "bg-stone-100 text-transparent"}`}>
                      <Icon name="check" className="h-3.5 w-3.5" />
                    </span>
                    {c}
                  </button>
                </li>
              ))}
            </ul>
            <button onClick={() => setChecklist(null)} className="mt-4 w-full rounded-xl bg-brand-700 py-2.5 text-sm font-bold text-white hover:bg-brand-800">
              Salvar check-list ({checks.length}/5)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
