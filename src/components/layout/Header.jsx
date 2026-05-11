import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, Moon, Search, ShoppingCart, Sun, User } from 'lucide-react';
import { toggleTheme } from '../../features/theme/themeSlice';
import { logout } from '../../features/auth/authSlice';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.products);
  const { mode } = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.auth);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  const navClass = ({ isActive }) => `text-sm font-semibold ${isActive ? 'text-slate-950 dark:text-white' : 'text-slate-500 hover:text-slate-950 dark:hover:text-white'}`;

  return <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/85">
    <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
      <Link to="/" className="text-xl font-black tracking-tight text-slate-950 dark:text-white">ShopSphere</Link>
      <nav className="hidden items-center gap-6 md:flex">
        <NavLink to="/" className={navClass}>Home</NavLink>
        <NavLink to="/shop" className={navClass}>Shop</NavLink>
        <NavLink to="/orders" className={navClass}>Orders</NavLink>
        <NavLink to="/profile" className={navClass}>Profile</NavLink>
      </nav>
      <div className="flex items-center gap-2">
        <button onClick={() => navigate('/shop')} className="rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800"><Search size={20} /></button>
        <Link to="/wishlist" className="relative rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800"><Heart size={20} />{wishlist.length > 0 && <span className="absolute -right-1 -top-1 rounded-full bg-pink-600 px-1.5 text-xs text-white">{wishlist.length}</span>}</Link>
        <Link to="/cart" className="relative rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800"><ShoppingCart size={20} />{count > 0 && <span className="absolute -right-1 -top-1 rounded-full bg-slate-950 px-1.5 text-xs text-white dark:bg-white dark:text-slate-950">{count}</span>}</Link>
        <button onClick={() => dispatch(toggleTheme())} className="rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800">{mode === 'light' ? <Moon size={20} /> : <Sun size={20} />}</button>
        {user ? <button onClick={() => dispatch(logout())} className="hidden rounded-full px-3 py-2 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 sm:block">Logout</button> : <Link to="/login" className="rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800"><User size={20} /></Link>}
      </div>
    </div>
  </header>;
}
