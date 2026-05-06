import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-[720px] mx-auto px-6 py-24 text-center">
      <div className="bg-term-bg text-term-fg font-pixel text-[20px] leading-tight border border-ink-0 p-6 text-left scanlines">
        <div>$ cat /var/log/nikolass.log | tail</div>
        <div className="text-term-amber">[404] entry not in catalogue</div>
        <div className="text-term-dim">// the page you&apos;re looking for has been filed under nothing.</div>
        <div className="mt-3 text-term-fg">→ try the <Link href="/" className="underline">index</Link>.<span className="caret">█</span></div>
      </div>
    </div>
  );
}
