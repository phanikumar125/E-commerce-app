import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { clearCart } from '../features/cart/cartSlice';
import { placeOrder } from '../features/orders/ordersSlice';
import { formatCurrency } from '../utils/format';

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { items, coupon } = useSelector((state) => state.cart);
  const [address, setAddress] = useState({ name: '', phone: '', line: '', city: '', pincode: '' });
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = coupon === 'SAVE10' ? Math.round(subtotal * 0.1) : 0;
  const delivery = subtotal > 2000 ? 0 : 99;
  const total = subtotal - discount + delivery;
  if (!token) return <Navigate to="/login" replace />;
  if (!items.length) return <Navigate to="/cart" replace />;
  const submit = (e) => {
    e.preventDefault();
    dispatch(placeOrder({ items, address, subtotal, discount, delivery, total, payment: 'Cash on Delivery' }));
    dispatch(clearCart());
    navigate('/orders');
  };
  return <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1fr_380px]">
    <div><h1 className="text-4xl font-black">Checkout</h1><Card className="mt-8"><form onSubmit={submit} className="grid gap-5 md:grid-cols-2"><Input label="Full Name" required value={address.name} onChange={(e) => setAddress({ ...address, name: e.target.value })} /><Input label="Phone" required value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })} /><Input label="Address" required className="md:col-span-2" value={address.line} onChange={(e) => setAddress({ ...address, line: e.target.value })} /><Input label="City" required value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} /><Input label="Pincode" required value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value })} /><div className="md:col-span-2 rounded-2xl bg-slate-50 p-4 text-sm dark:bg-slate-950"><b>Payment:</b> Cash on Delivery mock checkout</div><div className="md:col-span-2"><Button className="w-full py-3">Place Order</Button></div></form></Card></div>
    <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900"><h2 className="text-2xl font-black">Summary</h2><div className="mt-5 space-y-3">{items.map((item) => <p key={item.id} className="flex justify-between text-sm"><span>{item.name} × {item.quantity}</span><b>{formatCurrency(item.price * item.quantity)}</b></p>)}</div><hr className="my-5 border-slate-200 dark:border-slate-800" /><div className="space-y-2 text-sm"><p className="flex justify-between"><span>Subtotal</span><b>{formatCurrency(subtotal)}</b></p><p className="flex justify-between"><span>Discount</span><b>- {formatCurrency(discount)}</b></p><p className="flex justify-between"><span>Delivery</span><b>{delivery ? formatCurrency(delivery) : 'Free'}</b></p><p className="flex justify-between text-lg"><span className="font-black">Total</span><b>{formatCurrency(total)}</b></p></div></aside>
  </section>;
}
