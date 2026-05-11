import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Button from '../components/ui/Button';
import { applyCoupon, removeFromCart, updateQuantity } from '../features/cart/cartSlice';
import { formatCurrency } from '../utils/format';

export default function Cart() {
  const dispatch = useDispatch();
  const { items, coupon } = useSelector((state) => state.cart);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = coupon === 'SAVE10' ? Math.round(subtotal * 0.1) : 0;
  const delivery = subtotal > 2000 || subtotal === 0 ? 0 : 99;
  const total = subtotal - discount + delivery;
  return <section className="mx-auto max-w-7xl px-4 py-10">
    <h1 className="text-4xl font-black">Shopping Cart</h1>
    {!items.length ? <div className="mt-8 rounded-3xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-700"><h2 className="text-2xl font-black">Your cart is empty</h2><Link to="/shop" className="mt-5 inline-block rounded-2xl bg-slate-950 px-6 py-3 font-bold text-white dark:bg-white dark:text-slate-950">Start Shopping</Link></div> : <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
      <div className="space-y-4">{items.map((item) => <div key={item.id} className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-soft dark:border-slate-800 dark:bg-slate-900 sm:grid-cols-[120px_1fr_auto]"><img src={item.image} alt={item.name} className="h-28 w-full rounded-2xl object-cover" /><div><h3 className="text-lg font-black">{item.name}</h3><p className="mt-1 text-sm text-slate-500">{item.category}</p><p className="mt-3 font-black">{formatCurrency(item.price)}</p></div><div className="flex items-center gap-3 sm:flex-col sm:items-end"><div className="flex items-center rounded-2xl border border-slate-200 dark:border-slate-700"><button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))} className="p-2"><Minus size={16} /></button><span className="px-3 font-bold">{item.quantity}</span><button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))} className="p-2"><Plus size={16} /></button></div><button onClick={() => dispatch(removeFromCart(item.id))} className="rounded-full p-2 text-red-600 hover:bg-red-50"><Trash2 size={18} /></button></div></div>)}</div>
      <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900"><h2 className="text-2xl font-black">Order Summary</h2><div className="mt-5 flex gap-2"><input placeholder="Coupon: SAVE10" onBlur={(e) => dispatch(applyCoupon(e.target.value))} className="min-w-0 flex-1 rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-700 dark:bg-slate-950" /><Button variant="secondary">Apply</Button></div><div className="mt-6 space-y-3 text-sm"><p className="flex justify-between"><span>Subtotal</span><b>{formatCurrency(subtotal)}</b></p><p className="flex justify-between"><span>Discount</span><b>- {formatCurrency(discount)}</b></p><p className="flex justify-between"><span>Delivery</span><b>{delivery === 0 ? 'Free' : formatCurrency(delivery)}</b></p><hr className="border-slate-200 dark:border-slate-800" /><p className="flex justify-between text-lg"><span className="font-black">Total</span><b>{formatCurrency(total)}</b></p></div><Link to="/checkout" className="mt-6 block rounded-2xl bg-slate-950 px-6 py-3 text-center font-bold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950">Proceed to Checkout</Link></aside>
    </div>}
  </section>;
}
