import { Info } from "lucide-react";
import { CompatibleVehicle } from "@/app/types/product";
import CompatibilityTableClient from "./CompatibilityTableClient";

interface CompatibilityTableProps {
  vehicles: CompatibleVehicle[];
}

export default function CompatibilityTable({
  vehicles,
}: CompatibilityTableProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
      {/* Refined Minimal Header */}
      <div className="border-b border-zinc-100 p-6 md:p-8 bg-zinc-50/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-zinc-900 border border-zinc-200 shadow-sm">
              <Info size={24} strokeWidth={2} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-zinc-900 tracking-tight">
                Vehicle Compatibility
              </h2>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">
                Verified fitment for{" "}
                <span className="text-zinc-900">{vehicles.length}</span>{" "}
                configurations
              </p>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="px-3 py-1.5 rounded-lg bg-white border border-zinc-200 text-[10px] font-bold text-zinc-400 uppercase tracking-widest shadow-sm">
              Updated Jan 2026
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Table - Client Component Content */}
      <div className="bg-white">
        <CompatibilityTableClient vehicles={vehicles} />
      </div>
    </div>
  );
}
