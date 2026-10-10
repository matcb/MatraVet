import { useState } from "react";
import { automations, campaigns, type Automation } from "../data/mock";
import { Badge, Card } from "../components/ui";

export default function Marketing() {
  const [autos, setAutos] = useState<Automation[]>(automations);
  const [list, setList] = useState(campaigns);
  const [nps] = useState({ score: 78, promoters: 84, detractors: 6, responses: 212 });

  const toggle = (name: string) =>
    setAutos((prev) => prev.map((a) => (a.name === name ? { ...a, active: !a.active } : a)));

  const boost = () =>
    setList((prev) => [
      { name: "Mês da limpeza de tártaro", audience: "Cães 3+ com tártaro anotado", channel: "WhatsApp", reach: "96 tutores", response: "acabou de sair" },
      ...prev,
    ]);

  return (
    <div className="space-y-4 animate-fade-up sm:space-y-6">
      <div className="grid gap-4 xl:grid-cols-3 sm:gap-6">
        <Card className="p-5 text-center">
          <p className="text-xs font-bold text-stone-400 uppercase">NPS · satisfação</p>
          <p className="mt-1 text-5xl font-extrabold text-brand-700">{nps.score}</p>
          <p className="text-sm text-stone-500">Excelente · {nps.responses} respostas</p>
          <div className="mt-3 flex h-2.5 overflow-hidden rounded-full">
            <div className="bg-emerald-500" style={{ width: `${nps.promoters}%` }} />
            <div className="bg-stone-200" style={{ width: `${100 - nps.promoters - nps.detractors}%` }} />
            <div className="bg-red-400" style={{ width: `${nps.detractors}%` }} />
          </div>
          <p className="mt-2 text-xs text-stone-500">{nps.promoters}% promotores · {nps.detractors}% detratores</p>
        </Card>

        <Card className="p-5 xl:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-stone-900">Mensagens automáticas</h2>
              <p className="text-xs text-stone-500">WhatsApp · SMS · E-mail — lembretes que enchem a agenda sozinhos</p>
            </div>
            <Badge tone="green">{autos.filter((a) => a.active).length} ativas</Badge>
          </div>
          <ul className="mt-3 divide-y divide-stone-100">
            {autos.map((a) => (
              <li key={a.name} className="flex items-center gap-3 py-2.5">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-stone-900">{a.name}</p>
                  <p className="text-xs text-stone-500">{a.trigger} · {a.channel} · {a.sent}</p>
                </div>
                <button
                  onClick={() => toggle(a.name)}
                  role="switch"
                  aria-checked={a.active}
                  aria-label={a.name}
                  className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${a.active ? "bg-emerald-500" : "bg-stone-300"}`}
                >
                  <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${a.active ? "left-[22px]" : "left-0.5"}`} />
                </button>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between border-b border-stone-100 px-4 py-3 sm:px-5">
          <div>
            <h2 className="font-bold text-stone-900">Campanhas</h2>
            <p className="text-xs text-stone-500">Público certo, mensagem certa — traz de volta quem faltou e empurra os pacotes</p>
          </div>
          <button onClick={boost} className="rounded-xl bg-brand-700 px-4 py-2 text-sm font-bold text-white hover:bg-brand-800">
            + Nova campanha
          </button>
        </div>
        <ul className="divide-y divide-stone-100">
          {list.map((c) => (
            <li key={c.name} className="flex flex-col gap-2 px-4 py-3.5 sm:flex-row sm:items-center sm:px-5">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-stone-900">{c.name}</p>
                <p className="truncate text-xs text-stone-500">{c.audience} · via {c.channel}</p>
              </div>
              <span className="text-xs font-semibold text-stone-500">{c.reach}</span>
              <Badge tone="teal">{c.response}</Badge>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
