import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../features/cart/cartSlice';
import { toggleWishlist } from '../../features/products/productsSlice';
import { formatCurrency } from '../../utils/format';
import Button from './Button';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.products.wishlist);
  const liked = wishlist.includes(product.id);

  return <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft transition hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900">
    <div className="relative h-56 overflow-hidden bg-slate-100 dark:bg-slate-800">
      <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
      <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-950">{product.badge}</span>
      <button onClick={() => dispatch(toggleWishlist(product.id))} className={`absolute right-4 top-4 rounded-full p-2 shadow ${liked ? 'bg-pink-600 text-white' : 'bg-white text-slate-700'}`}><Heart size={18} fill={liked ? 'currentColor' : 'none'} /></button>
    </div>
    <div className="p-5">
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{product.category}</p>
        <p className="flex items-center gap-1 text-sm font-semibold"><Star size={16} className="fill-amber-400 text-amber-400" /> {product.rating}</p>
      </div>
      <Link to={`/product/${product.id}`} className="block text-lg font-black text-slate-950 hover:underline dark:text-white">{product.name}</Link>
      <p className="mt-2 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">{product.description}</p>
      <div className="mt-4 flex items-center gap-2">
        <span className="text-xl font-black">{formatCurrency(product.price)}</span>
        <span className="text-sm text-slate-400 line-through">{formatCurrency(product.oldPrice)}</span>
      </div>
      <Button onClick={() => dispatch(addToCart(product))} className="mt-5 w-full"><span className="inline-flex items-center gap-2"><ShoppingCart size={18} /> Add to Cart</span></Button>
    </div>
  </div>;
}
