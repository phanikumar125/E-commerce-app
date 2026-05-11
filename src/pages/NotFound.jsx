import { Link } from 'react-router-dom';

export default function NotFound() {
  return <section className="mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center px-4 text-center"><h1 className="text-7xl font-black">404</h1><p className="mt-4 text-xl text-slate-500">Page not found</p><Link to="/" className="mt-6 rounded-2xl bg-slate-950 px-6 py-3 font-bold text-white dark:bg-white dark:text-slate-950">Go Home</Link></section>;
}
