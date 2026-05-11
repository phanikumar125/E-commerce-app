import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/ui/ProductCard';
import { categories } from '../data/products';
import { clearFilters, setCategory, setMaxPrice, setQuery, setSortBy } from '../features/products/productsSlice';
import Button from '../components/ui/Button';

export default function Shop() {
  const dispatch = useDispatch();
  const { items, query, category, sortBy, maxPrice } = useSelector((state) => state.products);
  let filtered = items.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase()) &&
    (category === 'All' || product.category === category) &&
    product.price <= maxPrice
  );
  if (sortBy === 'low-high') filtered.sort((a, b) => a.price - b.price);
  if (sortBy === 'high-low') filtered.sort((a, b) => b.price - a.price);
  if (sortBy === 'rating') filtered.sort((a, b) => b.rating - a.rating);

  return <section className="mx-auto max-w-7xl px-4 py-10">
    <div className="mb-8"><h1 className="text-4xl font-black">Shop Products</h1><p className="mt-2 text-slate-500">Search, filter, sort, wishlist, and add products to cart.</p></div>
    <div className="mb-8 grid gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900 md:grid-cols-5">
      <input value={query} onChange={(e) => dispatch(setQuery(e.target.value))} placeholder="Search products..." className="rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-700 dark:bg-slate-950 md:col-span-2" />
      <select value={category} onChange={(e) => dispatch(setCategory(e.target.value))} className="rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-700 dark:bg-slate-950">{categories.map((cat) => <option key={cat}>{cat}</option>)}</select>
      <select value={sortBy} onChange={(e) => dispatch(setSortBy(e.target.value))} className="rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-700 dark:bg-slate-950"><option value="featured">Featured</option><option value="low-high">Price: Low to High</option><option value="high-low">Price: High to Low</option><option value="rating">Top Rated</option></select>
      <Button variant="secondary" onClick={() => dispatch(clearFilters())}>Clear</Button>
      <label className="md:col-span-5 text-sm font-semibold">Max Price: ₹{maxPrice}<input type="range" min="500" max="10000" step="500" value={maxPrice} onChange={(e) => dispatch(setMaxPrice(e.target.value))} className="mt-2 w-full" /></label>
    </div>
    {filtered.length ? <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{filtered.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="rounded-3xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-700"><h3 className="text-xl font-black">No products found</h3><p className="mt-2 text-slate-500">Try clearing filters or searching another keyword.</p></div>}
  </section>;
}
