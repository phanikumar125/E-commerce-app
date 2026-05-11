import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { updateProfile } from '../features/auth/authSlice';

export default function Profile() {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const [form, setForm] = useState(user || { name: '', email: '', role: '' });
  const [saved, setSaved] = useState(false);
  if (!token) return <Navigate to="/login" replace />;
  const submit = (e) => { e.preventDefault(); dispatch(updateProfile(form)); setSaved(true); };
  return <section className="mx-auto max-w-4xl px-4 py-10"><h1 className="text-4xl font-black">Profile</h1><Card className="mt-8"><form onSubmit={submit} className="grid gap-5 md:grid-cols-2"><Input label="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /><Input label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /><Input label="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} /><Input label="Phone" placeholder="Add phone number" /><div className="md:col-span-2"><Button>Save Profile</Button>{saved && <span className="ml-4 text-sm font-bold text-green-600">Profile updated</span>}</div></form></Card></section>;
}
