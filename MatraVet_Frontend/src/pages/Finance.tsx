import { useMemo, useState } from "react";
import { invoices, transactions } from "../data/mock";
import { Badge, Card } from "../components/ui";

type Tab = "overview" | "cashflow" | "invoices";
const tabLabels: Record<Tab, string> = { overview: "Visão geral", cashflow: "Fluxo de caixa", invoices: "Faturas" };

export default function Finance({ query }: { query: string }) {
  const [tab, setTab] = useState<Tab>("overview");
  const [paidIds, setPaidIds] = useState<string[]>([]);

  const q = query.trim().toLowerCase();
  const txs = useMemo(
    () => transactions.filter((t) => !q || t.description.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)),
    [q],
  );
  const invs = useMemo(
    () => invoices.filter((i) => !q || i.client.toLowerCase().includes(q) || i.id.toLowerCase().includes(q)),
    [q],
  );

  const income = transactions.filter((t) => t.kind === "income").reduce((a, t) => a + t.amount, 0);
  const expense = transactions.filter((t) => t.kind === "expense").reduce((a, t) => a + t.amount, 0);
  const pending = transactions.filter((t) => t.status === "Pendente").reduce((a, t) => a + t.amount, 0);

  const markPaid = (id: string) => setPaidIds((p) => [...p, id]);
  const statusOf = (id: string, s: string) => (paidIds.includes(id) ? "Pago" : s);

  return (
    <div className="space-y-4 animate-fade-up">
      <div className="flex gap-2">
        {(Object.keys(tabLabels) as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold capitalize ring-1 ring-inset ${tab === t ? "bg-brand-700 text-white ring-brand-700" : "bg-white text-stone-600 ring-stone-200"}`}
          >
            {tabLabels[t]}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <>
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {[
              ["Entradas (out)", `R$ ${(income / 1000).toFixed(1).replace(".", ",")} mil`, "text-emerald-700 bg-emerald-50 ring-emerald-200"],
              ["Saídas (out)", `R$ ${(expense / 1000).toFixed(1).replace(".", ",")} mil`, "text-red-700 bg-red-50 ring-red-200"],
              ["A receber", `R$ ${(pending / 1000).toFixed(1).replace(".", ",")} mil`, "text-amber-700 bg-amber-50 ring-amber-200"],
            ].map(([k, v, cls]) => (
              <Card key={k} className="p-4 text-center">
                <p className={`mx-auto w-fit rounded-full px-2.5 py-0.5 text-xs font-bold ring-1 ring-inset ${cls}`}>{k}</p>
                <p className="mt-2 text-xl font-extrabold text-stone-900 sm:text-2xl">{v}</p>
              </Card>
            ))}
          </div>
          <Card className="p-4 sm:p-5">
            <h2 className="font-bold">Previsão de recebíveis do cartão</h2>
            <p className="text-xs text-stone-500">Quanto cai na conta e quando — sem precisar ligar pra operadora</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-4">
              {[
                ["D+1 · 11 out", "R$ 1.240"],
                ["D+2 · 12 out", "R$ 860"],
                ["D+30 · 9 nov", "R$ 2.150"],
                ["D+31 · 10 nov", "R$ 640"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl bg-sand-100/80 p-3 text-center">
                  <p className="text-xs font-bold text-stone-500">{k}</p>
                  <p className="font-extrabold text-stone-900">{v}</p>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}

      {tab === "cashflow" && (
        <Card>
          <ul className="divide-y divide-stone-100">
            {txs.map((t) => (
              <li key={t.id} className="flex items-center gap-3 px-4 py-3 sm:px-5">
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-extrabold ${t.kind === "income" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`}>
                  {t.kind === "income" ? "+" : "−"}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-stone-900">{t.description}</p>
                  <p className="text-xs text-stone-500">{t.category} · {t.date} · {t.method}</p>
                </div>
                <p className={`font-extrabold ${t.kind === "income" ? "text-emerald-700" : "text-stone-900"}`}>
                  {t.kind === "income" ? "+" : "−"}R$ {t.amount.toLocaleString("pt-BR")}
                </p>
                <Badge tone={statusOf(t.id, t.status) === "Pago" ? "green" : "amber"}>{statusOf(t.id, t.status)}</Badge>
                {statusOf(t.id, t.status) === "Pendente" && (
                  <button onClick={() => markPaid(t.id)} className="rounded-xl bg-stone-900 px-3 py-1.5 text-xs font-bold text-white hover:bg-stone-700">
                    Dar baixa
                  </button>
                )}
              </li>
            ))}
            {txs.length === 0 && <li className="p-10 text-center text-sm text-stone-500">Nada bate com a busca.</li>}
          </ul>
        </Card>
      )}

      {tab === "invoices" && (
        <Card>
          <ul className="divide-y divide-stone-100">
            {invs.map((i) => (
              <li key={i.id} className="flex flex-col gap-2 px-4 py-3.5 sm:flex-row sm:items-center sm:px-5">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-stone-900">{i.id} · {i.service}</p>
                  <p className="truncate text-xs text-stone-500">{i.client} · {i.pet} · {i.date}</p>
                </div>
                <p className="text-sm font-extrabold">{i.amount}</p>
                <Badge tone={i.status === "Pago" ? "green" : i.status === "Pendente" ? "amber" : "red"}>{i.status}</Badge>
              </li>
            ))}
            {invs.length === 0 && <li className="p-10 text-center text-sm text-stone-500">Nenhuma fatura encontrada.</li>}
          </ul>
        </Card>
      )}
    </div>
  );
}
