import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Card from '../components/ui/Card';
import { formatCurrency } from '../utils/format';

export default function Orders() {
  const { token } = useSelector((state) => state.auth);
  const orders = useSelector((state) => state.orders.items);
  if (!token) return <Navigate to="/login" replace />;
  return <section className="mx-auto max-w-7xl px-4 py-10"><h1 className="text-4xl font-black">My Orders</h1>{orders.length ? <div className="mt-8 space-y-4">{orders.map((order) => <Card key={order.id}><div className="flex flex-wrap items-start justify-between gap-4"><div><h2 className="text-xl font-black">{order.id}</h2><p className="text-sm text-slate-500">Placed on {order.date} · {order.status}</p></div><p className="text-2xl font-black">{formatCurrency(order.total)}</p></div><div className="mt-4 grid gap-2">{order.items.map((item) => <p key={item.id} className="flex justify-between rounded-2xl bg-slate-50 p-3 text-sm dark:bg-slate-950"><span>{item.name} × {item.quantity}</span><b>{formatCurrency(item.price * item.quantity)}</b></p>)}</div></Card>)}</div> : <div className="mt-8 rounded-3xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-700"><h2 className="text-2xl font-black">No orders yet</h2><p className="mt-2 text-slate-500">Place an order from checkout to see it here.</p></div>}</section>;
}
