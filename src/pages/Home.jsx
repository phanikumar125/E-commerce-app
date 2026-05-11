import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, WalletCards } from 'lucide-react';
import { useSelector } from 'react-redux';
import ProductCard from '../components/ui/ProductCard';

export default function Home() {
  const products = useSelector((state) => state.products.items.slice(0, 4));
  return <>
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-[1.1fr_0.9fr] md:py-20">
      <div className="flex flex-col justify-center">
        <p className="mb-4 inline-flex w-fit rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white dark:bg-white dark:text-slate-950">New season sale up to 40%</p>
        <h1 className="text-5xl font-black tracking-tight text-slate-950 dark:text-white md:text-7xl">Build your dream shopping experience.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">A modern React e-commerce app with product search, filters, cart, checkout, orders, wishlist, profile, and theme support.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/shop" className="rounded-2xl bg-slate-950 px-6 py-3 font-bold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950">Shop Now</Link>
          <Link to="/cart" className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3 font-bold hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900">View Cart <ArrowRight size={18} /></Link>
        </div>
      </div>
      <div className="relative overflow-hidden rounded-[2rem] bg-slate-900 p-4 shadow-soft">
        <img src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=1200&q=80" alt="Shopping" className="h-[520px] w-full rounded-[1.5rem] object-cover opacity-90" />
        <div className="absolute bottom-8 left-8 right-8 rounded-3xl bg-white/90 p-5 backdrop-blur dark:bg-slate-950/90">
          <p className="text-sm font-bold text-slate-500">Today Revenue</p>
          <p className="text-3xl font-black text-slate-950 dark:text-white">₹2.8L+</p>
        </div>
      </div>
    </section>
    <section className="mx-auto grid max-w-7xl gap-4 px-4 pb-8 md:grid-cols-3">
      {[['Fast Delivery', Truck], ['Secure Payments', ShieldCheck], ['Easy Refunds', WalletCards]].map(([title, Icon]) => <div key={title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900"><Icon /><h3 className="mt-4 text-lg font-black">{title}</h3><p className="mt-2 text-sm text-slate-500">Professional e-commerce UX designed for portfolio and interview demos.</p></div>)}
    </section>
    <section className="mx-auto max-w-7xl px-4 py-12"><div className="mb-8 flex items-center justify-between"><h2 className="text-3xl font-black">Featured Products</h2><Link to="/shop" className="font-bold text-slate-600 hover:text-slate-950 dark:text-slate-300">View all</Link></div><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div></section>
  </>;
}
