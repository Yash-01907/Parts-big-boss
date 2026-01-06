import { Shield, Truck, Check } from "lucide-react";
interface ProductOverviewProps {
  title: string;
}

export default function ProductOverview({ title }: ProductOverviewProps) {
  return (
    <section className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Left/Top Side: Main Description */}
        <div className="p-6 md:p-10 md:w-1/2 space-y-6 flex flex-col justify-center">
          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 tracking-tight">
              Product Overview
            </h2>
            <p className="text-base md:text-lg text-zinc-600 leading-relaxed">
              The <span className="text-zinc-900 font-bold">{title}</span> is
              engineered for precision performance, ensuring your vehicle
              maintains its factory reliability while optimizing efficiency.
            </p>
            <p className="text-sm md:text-base text-zinc-500 font-medium">
              Every component undergoes rigorous testing to match or exceed OE
              standards.
            </p>
          </div>

          {/* Bottom Icons Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 mt-auto">
            {/* Feature 1 */}
            <div className="flex gap-4 items-start group">
              <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-zinc-100 text-zinc-900 group-hover:bg-zinc-900 group-hover:text-white transition-colors duration-300 shrink-0">
                <Shield size={20} />
              </div>
              <div className="space-y-1">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                  Performance
                </h3>
                <p className="text-xs text-zinc-500 leading-snug">
                  Identical performance to factory original parts.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex gap-4 items-start group">
              <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-zinc-100 text-zinc-900 group-hover:bg-zinc-900 group-hover:text-white transition-colors duration-300 shrink-0">
                <Truck size={20} />
              </div>
              <div className="space-y-1">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                  Logistics
                </h3>
                <p className="text-xs text-zinc-500 leading-snug">
                  Dispatched within hours of order confirmation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right/Bottom Side: Feature Matrix */}
        <div className="md:w-1/2 bg-zinc-50/80 border-t md:border-t-0 md:border-l border-zinc-100 p-6 md:p-10 flex flex-col justify-center">
          <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-6">
            Key Specifications
          </h3>

          <div className="grid grid-cols-1 gap-y-4">
            {[
              "Direct Fit Replacement",
              "Easy Plug-and-Play Installation",
              "High-Impact Resistance",
              "Waterproof & Dustproof Seal",
              "DOT & SAE Compliance Certified",
              "Ultra-Efficient LED Core",
            ].map((feat, idx) => (
              <div key={idx} className="flex items-center gap-3 group w-full">
                {/* Red Accent Bullet */}
                <div className="flex items-center justify-center h-5 w-5 rounded-full bg-red-100 text-red-600 shrink-0 group-hover:scale-110 transition-transform duration-200">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-600" />
                </div>

                <span className="text-sm md:text-base font-semibold text-zinc-700 group-hover:text-zinc-900 transition-colors">
                  {feat}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
