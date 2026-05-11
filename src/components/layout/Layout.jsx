import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  return <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white"><Header /><main>{children}</main><Footer /></div>;
}
