import { useState } from "react";
import { groomers, vets } from "../data/mock";
import Icon from "./Icon";

export type BookingKind = "clinic" | "grooming";

export interface ClinicDraft {
  pet: string;
  owner: string;
  time: string;
  vet: string;
  reason: string;
}

export interface GroomDraft {
  pet: string;
  owner: string;
  time: string;
  service: string;
  groomer: string;
  notes: string;
}

const inputCls =
  "mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 font-normal outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100";

export default function BookingModal({
  kind,
  onTab,
  onClose,
  onBookClinic,
  onBookGrooming,
}: {
  kind: BookingKind;
  onTab: (k: BookingKind) => void;
  onClose: () => void;
  onBookClinic: (d: ClinicDraft) => void;
  onBookGrooming: (d: GroomDraft) => void;
}) {
  const [c, setC] = useState<ClinicDraft>({ pet: "", owner: "", time: "16:00", vet: vets[0], reason: "" });
  const [g, setG] = useState<GroomDraft>({ pet: "", owner: "", time: "16:00", service: "Banho", groomer: groomers[0], notes: "" });

  const clinicValid = c.pet.trim() !== "" && c.owner.trim() !== "";
  const groomValid = g.pet.trim() !== "" && g.owner.trim() !== "";

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Novo agendamento"
    >
      <div className="w-full max-w-md rounded-t-3xl bg-white p-5 sm:rounded-3xl sm:p-6 animate-fade-up">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold">Novo agendamento</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 hover:bg-stone-100" aria-label="Fechar">
            <Icon name="x" className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 rounded-2xl bg-stone-100 p-1">
          {(["clinic", "grooming"] as const).map((t) => (
            <button
              key={t}
              onClick={() => onTab(t)}
              className={`rounded-xl py-2 text-sm font-bold ${kind === t ? "bg-white text-brand-900 shadow" : "text-stone-500 hover:text-stone-800"}`}
              aria-pressed={kind === t}
            >
              {t === "clinic" ? "Consulta" : "Banho & tosa"}
            </button>
          ))}
        </div>

        {kind === "clinic" ? (
          <div className="mt-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <label className="text-sm font-semibold">Pet
                <input value={c.pet} onChange={(e) => setC({ ...c, pet: e.target.value })} placeholder="Ex.: Thor" className={inputCls} />
              </label>
              <label className="text-sm font-semibold">Tutor
                <input value={c.owner} onChange={(e) => setC({ ...c, owner: e.target.value })} placeholder="Nome do tutor" className={inputCls} />
              </label>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <label className="text-sm font-semibold">Horário
                <input type="time" value={c.time} onChange={(e) => setC({ ...c, time: e.target.value })} className={inputCls} />
              </label>
              <label className="text-sm font-semibold">Veterinário
                <select value={c.vet} onChange={(e) => setC({ ...c, vet: e.target.value })} className={inputCls}>
                  {vets.map((v) => <option key={v}>{v}</option>)}
                </select>
              </label>
            </div>
            <label className="block text-sm font-semibold">Motivo
              <input value={c.reason} onChange={(e) => setC({ ...c, reason: e.target.value })} placeholder="Ex.: Vacinas anuais" className={inputCls} />
            </label>
            <button
              onClick={() => onBookClinic(c)}
              disabled={!clinicValid}
              className="w-full rounded-xl bg-brand-700 py-2.5 text-sm font-bold text-white hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Agendar consulta
            </button>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <label className="text-sm font-semibold">Pet
                <input value={g.pet} onChange={(e) => setG({ ...g, pet: e.target.value })} placeholder="Ex.: Thor" className={inputCls} />
              </label>
              <label className="text-sm font-semibold">Tutor
                <input value={g.owner} onChange={(e) => setG({ ...g, owner: e.target.value })} placeholder="Nome do tutor" className={inputCls} />
              </label>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <label className="text-sm font-semibold">Horário
                <input type="time" value={g.time} onChange={(e) => setG({ ...g, time: e.target.value })} className={inputCls} />
              </label>
              <label className="text-sm font-semibold">Serviço
                <select value={g.service} onChange={(e) => setG({ ...g, service: e.target.value })} className={inputCls}>
                  {["Banho", "Banho + Tosa", "Tosa", "Corte de unhas"].map((s) => <option key={s}>{s}</option>)}
                </select>
              </label>
            </div>
            <label className="text-sm font-semibold">Profissional
              <select value={g.groomer} onChange={(e) => setG({ ...g, groomer: e.target.value })} className={inputCls}>
                {groomers.map((gr) => <option key={gr}>{gr}</option>)}
              </select>
            </label>
            <label className="block text-sm font-semibold">Observações para o tosador
              <input value={g.notes} onChange={(e) => setG({ ...g, notes: e.target.value })} placeholder="Ex.: Shampoo hipoalergênico, tosa ursinho" className={inputCls} />
            </label>
            <button
              onClick={() => onBookGrooming(g)}
              disabled={!groomValid}
              className="w-full rounded-xl bg-sky-600 py-2.5 text-sm font-bold text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Agendar banho/tosa
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
