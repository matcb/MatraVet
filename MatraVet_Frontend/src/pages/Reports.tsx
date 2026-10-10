import { inventory, revenueByGroup, teamPerformance } from "../data/mock";
import { Badge, Card } from "../components/ui";

export default function Reports() {
  const maxRev = Math.max(...revenueByGroup.map((r) => r.value));
  const stuck = inventory.filter((i) => i.stock > i.minStock * 2);
  const low = inventory.filter((i) => i.stock <= i.minStock);

  return (
    <div className="space-y-4 animate-fade-up sm:space-y-6">
      <div className="grid gap-4 xl:grid-cols-2 sm:gap-6">
        <Card className="p-4 sm:p-5">
          <h2 className="font-bold text-stone-900">Receita por grupo de serviço</h2>
          <p className="text-xs text-stone-500">Quais setores botam dinheiro pra dentro — outubro</p>
          <ul className="mt-4 space-y-3">
            {revenueByGroup.map((r) => (
              <li key={r.group}>
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-stone-800">{r.group}</span>
                  <span className="font-extrabold text-stone-900">R$ {(r.value / 1000).toFixed(1).replace(".", ",")} mil</span>
                </div>
                <div className="mt-1 h-2.5 overflow-hidden rounded-full bg-stone-100">
                  <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-emerald-400" style={{ width: `${(r.value / maxRev) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-4 sm:p-5">
          <h2 className="font-bold text-stone-900">Produtividade e comissões da equipe</h2>
          <p className="text-xs text-stone-500">Calculado sozinho — sem planilha, sem discussão</p>
          <ul className="mt-3 divide-y divide-stone-100">
            {teamPerformance.map((t) => (
              <li key={t.name} className="flex items-center gap-3 py-2.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-extrabold text-brand-800">
                  {t.name.replace("Dra. ", "").replace("Dr. ", "")[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-stone-900">{t.name}</p>
                  <p className="text-xs text-stone-500">{t.role}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-extrabold text-stone-900">{t.sales}</p>
                  <p className="text-xs font-semibold text-emerald-700">{t.commission}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-2 sm:gap-6">
        <Card className="p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-stone-900">Inteligência do estoque</h2>
            <Badge tone="amber">visão exclusiva</Badge>
          </div>
          <p className="mt-1 text-sm text-stone-600">
            <strong className="text-red-700">{low.length} itens</strong> precisando de reposição ·{" "}
            <strong>{stuck.length} itens</strong> parados na prateleira prendendo dinheiro.
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            {low.map((i) => (
              <li key={i.id} className="flex justify-between gap-2 rounded-xl bg-red-50 px-3 py-2 ring-1 ring-red-100">
                <span className="truncate font-medium text-stone-700">Repor: {i.name}</span>
                <span className="shrink-0 font-extrabold text-red-700">{i.stock} {i.unit}</span>
              </li>
            ))}
            {stuck.slice(0, 3).map((i) => (
              <li key={i.id} className="flex justify-between gap-2 rounded-xl bg-stone-100 px-3 py-2">
                <span className="truncate font-medium text-stone-600">Encalhado: {i.name}</span>
                <span className="shrink-0 font-bold text-stone-500">{i.stock} {i.unit}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-4 sm:p-5">
          <h2 className="font-bold text-stone-900">Inteligência de clientes</h2>
          <p className="text-xs text-stone-500">Frequência, tíquete e melhores clientes</p>
          <ul className="mt-3 space-y-2.5 text-sm">
            {[
              ["Melhor cliente", "Camila Rocha · 14 visitas · R$ 3,1 mil no total"],
              ["Hora de chamar de volta", "23 tutores sem visitar há 60+ dias — campanha pronta"],
              ["Dia mais cheio", "Sábado · movimento 2,1x maior que dia de semana"],
              ["Produto que mais sai", "Ração renal premium · 32 pct por mês"],
            ].map(([k, v]) => (
              <li key={k} className="rounded-xl border border-stone-200 p-3">
                <p className="text-xs font-bold text-stone-400 uppercase">{k}</p>
                <p className="mt-0.5 font-semibold text-stone-800">{v}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
