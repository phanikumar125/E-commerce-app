import { useSelector } from 'react-redux';
import ProductCard from '../components/ui/ProductCard';

export default function Wishlist() {
  const { items, wishlist } = useSelector((state) => state.products);
  const products = items.filter((product) => wishlist.includes(product.id));
  return <section className="mx-auto max-w-7xl px-4 py-10">
    <h1 className="text-4xl font-black">Wishlist</h1>
    <p className="mt-2 text-slate-500">Products you saved for later.</p>
    {products.length ? <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="mt-8 rounded-3xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-700"><h2 className="text-2xl font-black">No wishlist items yet</h2><p className="mt-2 text-slate-500">Click the heart icon on products you like.</p></div>}
  </section>;
}
