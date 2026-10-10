import { useMemo, useState } from "react";
import type { Appointment, AppointmentStatus } from "../data/mock";
import { Badge, Card } from "../components/ui";
import Icon from "../components/Icon";

const tone = (s: AppointmentStatus) =>
  s === "Urgente" ? "red" : s === "Em atendimento" ? "blue" : s === "Concluído" ? "green" : s === "Cancelado" ? "neutral" : "teal";

const filters = ["Todas", "Agendado", "Em atendimento", "Urgente", "Concluído"] as const;

export default function Appointments({
  query,
  appts,
  onStatus,
  onNew,
}: {
  query: string;
  appts: Appointment[];
  onStatus: (id: string, status: AppointmentStatus) => void;
  onNew: () => void;
}) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("Todas");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return appts.filter(
      (a) =>
        (filter === "Todas" || a.status === filter) &&
        (!q || a.pet.toLowerCase().includes(q) || a.owner.toLowerCase().includes(q) || a.reason.toLowerCase().includes(q)),
    );
  }, [appts, filter, query]);

  return (
    <div className="space-y-4 animate-fade-up">
      <div className="flex flex-wrap items-center gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-3.5 py-1.5 text-sm font-semibold ring-1 ring-inset transition-colors ${
              filter === f
                ? "bg-brand-700 text-white ring-brand-700"
                : "bg-white text-stone-600 ring-stone-200 hover:bg-stone-50"
            }`}
          >
            {f}
          </button>
        ))}
        <button
          onClick={onNew}
          className="ml-auto flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2 text-sm font-bold text-white hover:bg-brand-800"
        >
          <Icon name="plus" className="h-4 w-4" /> Novo agendamento
        </button>
      </div>

      <Card>
        <ul className="divide-y divide-stone-100">
          {visible.map((a) => (
            <li key={a.id} className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:px-5">
              <div className="flex items-center gap-3 sm:w-56 sm:shrink-0">
                <div className="rounded-xl bg-brand-50 px-2.5 py-1.5 text-center ring-1 ring-brand-100">
                  <p className="text-sm font-extrabold text-brand-800">{a.time}</p>
                  <p className="text-[10px] font-bold text-brand-600">{a.room}</p>
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-stone-900">{a.pet}</p>
                  <p className="truncate text-xs text-stone-500">{a.owner}</p>
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-stone-800">{a.reason}</p>
                <p className="text-xs text-stone-500">
                  {a.type} · {a.vet}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge tone={tone(a.status) as "red" | "blue" | "green" | "neutral" | "teal"}>{a.status}</Badge>
                {a.status === "Agendado" || a.status === "Urgente" ? (
                  <>
                    <button
                      onClick={() => onStatus(a.id, "Concluído")}
                      className="rounded-lg bg-emerald-50 p-1.5 text-emerald-700 ring-1 ring-emerald-200 hover:bg-emerald-100"
                      title="Marcar como concluída"
                      aria-label={`Concluir ${a.pet}`}
                    >
                      <Icon name="check" className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onStatus(a.id, "Cancelado")}
                      className="rounded-lg bg-red-50 p-1.5 text-red-600 ring-1 ring-red-200 hover:bg-red-100"
                      title="Cancelar"
                      aria-label={`Cancelar ${a.pet}`}
                    >
                      <Icon name="x" className="h-4 w-4" />
                    </button>
                  </>
                ) : null}
              </div>
            </li>
          ))}
          {visible.length === 0 && (
            <li className="px-5 py-12 text-center">
              <p className="font-bold text-stone-800">Nenhum atendimento encontrado</p>
              <p className="text-sm text-stone-500">Tente outro filtro ou agende uma nova visita.</p>
            </li>
          )}
        </ul>
      </Card>
    </div>
  );
}
