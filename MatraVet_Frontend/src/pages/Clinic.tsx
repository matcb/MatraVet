import { useMemo, useState } from "react";
import { inventory, owners } from "../data/mock";
import { Badge, Card } from "../components/ui";
import Icon from "../components/Icon";

export function Clients({ query }: { query: string }) {
  const q = query.trim().toLowerCase();
  const visible = owners.filter(
    (o) => !q || o.name.toLowerCase().includes(q) || o.phone.includes(q) || o.id.toLowerCase().includes(q),
  );
  return (
    <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3 animate-fade-up">
      {visible.map((o) => (
        <Card key={o.id} className="p-4 sm:p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-100 font-extrabold text-brand-800">
              {o.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
            </div>
            <div className="min-w-0">
              <p className="truncate font-extrabold text-stone-900">{o.name}</p>
              <p className="text-xs text-stone-500">{o.id} · Tutor desde {o.since}</p>
            </div>
            <Badge tone="teal" >{o.pets} pets</Badge>
          </div>
          <div className="mt-3 space-y-1.5 border-t border-stone-100 pt-3 text-sm text-stone-600">
            <p className="flex items-center gap-2"><Icon name="phone" className="h-4 w-4 text-stone-400" />{o.phone}</p>
            <p className="flex items-center gap-2 truncate"><Icon name="mail" className="h-4 w-4 text-stone-400" />{o.email}</p>
            <p className="truncate text-xs text-stone-400">{o.address}</p>
          </div>
        </Card>
      ))}
      {visible.length === 0 && (
        <Card className="col-span-full p-12 text-center">
          <p className="font-bold">Nenhum tutor com “{query}”</p>
        </Card>
      )}
    </div>
  );
}

export function Inventory({ query }: { query: string }) {
  const [onlyLow, setOnlyLow] = useState(false);
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return inventory.filter(
      (i) =>
        (!onlyLow || i.stock <= i.minStock) &&
        (!q || i.name.toLowerCase().includes(q) || i.category.toLowerCase().includes(q)),
    );
  }, [query, onlyLow]);
  return (
    <div className="space-y-4 animate-fade-up">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setOnlyLow(!onlyLow)}
          className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-semibold ring-1 ring-inset ${onlyLow ? "bg-amber-500 text-white ring-amber-500" : "bg-white text-stone-600 ring-stone-200"}`}
          aria-pressed={onlyLow}
        >
          <Icon name="alert" className="h-4 w-4" /> Só estoque baixo
        </button>
        <span className="ml-auto text-sm text-stone-500">{visible.length} itens</span>
      </div>
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-stone-100 text-xs uppercase text-stone-400">
                <th className="px-4 py-3 font-bold sm:px-5">Item</th>
                <th className="px-4 py-3 font-bold">Categoria</th>
                <th className="px-4 py-3 font-bold">Estoque</th>
                <th className="px-4 py-3 font-bold">Preço</th>
                <th className="px-4 py-3 font-bold">Fornecedor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {visible.map((i) => {
                const low = i.stock <= i.minStock;
                return (
                  <tr key={i.id} className="hover:bg-sand-50">
                    <td className="px-4 py-3 font-bold text-stone-900 sm:px-5">{i.name}</td>
                    <td className="px-4 py-3"><Badge tone="neutral">{i.category}</Badge></td>
                    <td className="px-4 py-3">
                      <span className={`font-extrabold ${low ? "text-red-600" : "text-stone-800"}`}>
                        {i.stock} {i.unit}
                      </span>
                      {low && <span className="ml-2 rounded-full bg-red-50 px-2 py-0.5 text-xs font-bold text-red-700">repor</span>}
                    </td>
                    <td className="px-4 py-3 text-stone-600">{i.price}</td>
                    <td className="px-4 py-3 text-stone-500">{i.supplier} · val. {i.expiry}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {visible.length === 0 && <p className="p-10 text-center text-sm text-stone-500">Estoque todo em dia. Coisa boa.</p>}
      </Card>
    </div>
  );
}
