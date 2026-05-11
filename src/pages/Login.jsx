import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import { login } from '../features/auth/authSlice';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, error } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ email: 'customer@example.com', password: 'customer123' });
  if (token) return <Navigate to="/profile" replace />;
  const submit = (e) => { e.preventDefault(); dispatch(login(form)); setTimeout(() => navigate('/profile'), 100); };
  return <section className="mx-auto flex min-h-[75vh] max-w-7xl items-center justify-center px-4 py-10">
    <Card className="w-full max-w-md"><h1 className="text-3xl font-black">Customer Login</h1><p className="mt-2 text-sm text-slate-500">Use demo credentials to access orders and profile.</p><form onSubmit={submit} className="mt-6 space-y-4"><Input label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /><Input label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />{error && <p className="rounded-2xl bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}<Button className="w-full py-3">Login</Button></form><div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600 dark:bg-slate-950 dark:text-slate-300"><b>Demo:</b><br />customer@example.com<br />customer123</div></Card>
  </section>;
}
