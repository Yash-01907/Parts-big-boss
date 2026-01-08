import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function SignupStyles() {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[var(--color-zinc-950)] text-[var(--color-white)] flex-col justify-between p-16">
      {/* Abstract Background */}
      <div className="absolute inset-0 bg-[var(--color-black)]">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[var(--color-zinc-900)] to-[var(--color-black)] opacity-20" />
        <div className="absolute -top-[20%] -right-[20%] w-[80%] h-[80%] rounded-full bg-[var(--color-zinc-800)] mix-blend-screen filter blur-[120px] opacity-10" />
        <div className="absolute bottom-[0%] left-[0%] w-[60%] h-[60%] rounded-full bg-[var(--color-zinc-900)] mix-blend-screen filter blur-[100px] opacity-10" />
      </div>

      {/* Branding */}
      <div className="relative z-10">
        <Link href="/" className="inline-flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-[var(--color-white)] font-bold shadow-lg group-hover:scale-105 transition-transform">
            P
          </div>
          <span className="font-bold text-xl tracking-tight text-[var(--color-white)]">
            PartsBigBoss
          </span>
        </Link>
      </div>

      {/* Content */}
      <div className="relative z-10 space-y-6 max-w-lg">
        <h1 className="text-5xl font-extrabold leading-tight tracking-tight">
          Join the Future of Auto Parts.
        </h1>
        <p className="text-lg text-[var(--color-white)]/70 leading-relaxed font-light">
          Create an account to start ordering, tracking, and managing your auto
          parts inventory with ease.
        </p>

        <div className="pt-8 space-y-4">
          {[
            "Instant Account Setup",
            "Exclusive Deals & Offers",
            "Priority Support Access",
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 text-[var(--color-white)]/80"
            >
              <CheckCircle2 size={20} className="text-[var(--accent)]" />
              <span className="font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 text-xs text-[var(--color-white)]/40 font-medium tracking-wide uppercase">
        © 2024 Parts Big Boss. All Rights Reserved.
      </div>
    </div>
  );
}
