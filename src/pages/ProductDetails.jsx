import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import Button from '../components/ui/Button';
import { addToCart } from '../features/cart/cartSlice';
import { toggleWishlist } from '../features/products/productsSlice';
import { formatCurrency } from '../utils/format';

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { items, wishlist } = useSelector((state) => state.products);
  const product = items.find((item) => item.id === Number(id));
  if (!product) return <div className="mx-auto max-w-7xl px-4 py-20"><h1 className="text-3xl font-black">Product not found</h1><Link to="/shop" className="mt-4 inline-block underline">Back to shop</Link></div>;
  const liked = wishlist.includes(product.id);
  return <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 lg:grid-cols-2">
    <div className="overflow-hidden rounded-[2rem] bg-slate-100 shadow-soft dark:bg-slate-900"><img src={product.image} alt={product.name} className="h-[520px] w-full object-cover" /></div>
    <div className="flex flex-col justify-center">
      <p className="text-sm font-bold uppercase tracking-wide text-slate-500">{product.category}</p>
      <h1 className="mt-3 text-5xl font-black tracking-tight">{product.name}</h1>
      <div className="mt-4 flex items-center gap-3"><span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-sm font-bold text-amber-700"><Star size={16} className="fill-amber-400 text-amber-400" /> {product.rating}</span><span className="text-sm text-slate-500">{product.stock} items in stock</span></div>
      <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">{product.description}</p>
      <div className="mt-6 flex items-end gap-3"><span className="text-4xl font-black">{formatCurrency(product.price)}</span><span className="text-lg text-slate-400 line-through">{formatCurrency(product.oldPrice)}</span></div>
      <div className="mt-8 flex flex-wrap gap-3"><Button onClick={() => dispatch(addToCart(product))} className="px-8 py-3"><span className="inline-flex items-center gap-2"><ShoppingCart size={18} /> Add to Cart</span></Button><Button variant="secondary" onClick={() => dispatch(toggleWishlist(product.id))}><span className="inline-flex items-center gap-2"><Heart size={18} fill={liked ? 'currentColor' : 'none'} /> {liked ? 'Wishlisted' : 'Wishlist'}</span></Button></div>
      <div className="mt-8 grid gap-3 text-sm text-slate-500 sm:grid-cols-3"><div className="rounded-2xl bg-white p-4 dark:bg-slate-900">7-day replacement</div><div className="rounded-2xl bg-white p-4 dark:bg-slate-900">Free delivery</div><div className="rounded-2xl bg-white p-4 dark:bg-slate-900">Secure payment</div></div>
    </div>
  </section>;
}
