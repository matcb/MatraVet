import { useMemo, useState } from "react";
import { products, recentSales, type Product } from "../data/mock";
import { Badge, Card } from "../components/ui";
import Icon from "../components/Icon";

export default function Pos({ query }: { query: string }) {
  const [cart, setCart] = useState<Record<string, number>>({ "P-01": 1, "P-04": 2 });
  const [sales, setSales] = useState(recentSales);
  const [client, setClient] = useState("Camila Rocha");
  const [done, setDone] = useState<string | null>(null);

  const q = query.trim().toLowerCase();
  const catalog = useMemo(
    () => products.filter((p) => !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)),
    [q],
  );

  const add = (id: string) => setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
  const dec = (id: string) =>
    setCart((c) => {
      const next = { ...c };
      if ((next[id] ?? 0) <= 1) delete next[id];
      else next[id] -= 1;
      return next;
    });

  const lines = Object.entries(cart)
    .map(([id, qty]) => ({ product: products.find((p) => p.id === id) as Product, qty }))
    .filter((l) => l.product);
  const subtotal = lines.reduce((a, l) => a + l.product.price * l.qty, 0);
  const discount = subtotal > 200 ? subtotal * 0.05 : 0;

  const checkout = () => {
    const total = subtotal - discount;
    setSales((s) => [
      { id: `S-${882 + s.length}`, client, items: lines.reduce((a, l) => a + l.qty, 0), total: `R$ ${total.toFixed(0)}`, method: "Pix", seller: "Ana (recepção)", time: "agora" },
      ...s,
    ]);
    setDone(`R$ ${total.toFixed(0)}`);
    setCart({});
    setTimeout(() => setDone(null), 2600);
  };

  return (
    <div className="grid gap-4 xl:grid-cols-3 animate-fade-up sm:gap-6">
      {/* Catálogo */}
      <div className="space-y-3 xl:col-span-2">
        <div className="flex items-center gap-2">
          <h2 className="font-bold text-stone-900">Catálogo</h2>
          <Badge tone="teal">{catalog.length} produtos</Badge>
          <span className="ml-auto text-xs text-stone-400">Com leitor de código de barras · baixa do estoque sozinha</span>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {catalog.map((p) => (
            <Card key={p.id} className="p-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-extrabold text-white ${p.color}`}>
                {p.name[0]}
              </div>
              <p className="mt-2 line-clamp-2 min-h-10 text-sm font-bold text-stone-900">{p.name}</p>
              <p className="text-xs text-stone-500">{p.category} · {p.stock} em estoque</p>
              <div className="mt-2 flex items-center justify-between">
                <p className="font-extrabold text-stone-900">R$ {p.price}</p>
                <button onClick={() => add(p.id)} className="rounded-lg bg-brand-700 p-1.5 text-white hover:bg-brand-800" aria-label={`Adicionar ${p.name}`}>
                  <Icon name="plus" className="h-4 w-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>
        {catalog.length === 0 && (
          <Card className="p-10 text-center text-sm text-stone-500">Nada com “{query}” no catálogo.</Card>
        )}

        <Card>
          <div className="border-b border-stone-100 px-4 py-3">
            <h2 className="font-bold text-stone-900">Vendas unificadas por tutor</h2>
            <p className="text-xs text-stone-500">Clínica + loja + banho do mesmo tutor, no mesmo dia, num cupom só</p>
          </div>
          <ul className="divide-y divide-stone-100">
            {sales.map((s) => (
              <li key={s.id} className="flex items-center gap-3 px-4 py-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">{s.id} · {s.client}</p>
                  <p className="text-xs text-stone-500">{s.items} itens · {s.method} · {s.seller} · {s.time}</p>
                </div>
                <p className="font-extrabold">{s.total}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Carrinho */}
      <Card className="flex h-fit flex-col p-4 sm:p-5 xl:sticky xl:top-20">
        <h2 className="font-bold text-stone-900">Venda atual</h2>
        <label className="mt-2 text-xs font-bold text-stone-500 uppercase">Tutor
          <input value={client} onChange={(e) => setClient(e.target.value)} className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm font-normal normal-case outline-none focus:border-brand-400" />
        </label>
        <ul className="mt-3 flex-1 space-y-2">
          {lines.map(({ product: p, qty }) => (
            <li key={p.id} className="flex items-center gap-2 rounded-xl bg-sand-100/70 p-2.5">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold">{p.name}</p>
                <p className="text-xs text-stone-500">R$ {p.price} cada</p>
              </div>
              <div className="flex items-center gap-1.5">
                <button onClick={() => dec(p.id)} className="rounded-lg bg-white px-2 py-1 font-bold ring-1 ring-stone-200" aria-label="Diminuir">−</button>
                <span className="w-5 text-center text-sm font-extrabold">{qty}</span>
                <button onClick={() => add(p.id)} className="rounded-lg bg-white px-2 py-1 font-bold ring-1 ring-stone-200" aria-label="Aumentar">+</button>
              </div>
            </li>
          ))}
          {lines.length === 0 && <li className="rounded-xl border border-dashed border-stone-200 p-6 text-center text-sm text-stone-400">Carrinho vazio — toque no + de qualquer produto.</li>}
        </ul>
        <div className="mt-3 space-y-1 border-t border-stone-100 pt-3 text-sm">
          <p className="flex justify-between text-stone-600"><span>Subtotal</span><span className="font-bold">R$ {subtotal.toFixed(0)}</span></p>
          <p className="flex justify-between text-emerald-700"><span>Desconto fidelidade (5% acima de R$ 200)</span><span className="font-bold">−R$ {discount.toFixed(0)}</span></p>
          <p className="flex justify-between text-lg font-extrabold text-stone-900"><span>Total</span><span>R$ {(subtotal - discount).toFixed(0)}</span></p>
        </div>
        <button
          onClick={checkout}
          disabled={lines.length === 0}
          className="mt-3 w-full rounded-xl bg-brand-700 py-3 text-sm font-bold text-white hover:bg-brand-800 disabled:opacity-40"
        >
          {done ? `Recebido ${done} ✓ — cupom enviado` : "Cobrar · Pix / Cartão / Dinheiro"}
        </button>
        <p className="mt-2 text-center text-xs text-stone-400">A NFC-e sai sozinha no fechamento da venda.</p>
      </Card>
    </div>
  );
}
