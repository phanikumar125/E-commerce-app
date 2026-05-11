export default function Input({ label, className = '', ...props }) {
  return <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">{label && <span className="mb-2 block">{label}</span>}<input className={`w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none ring-slate-950/10 transition focus:ring-4 dark:border-slate-700 dark:bg-slate-950 dark:text-white ${className}`} {...props} /></label>;
}
