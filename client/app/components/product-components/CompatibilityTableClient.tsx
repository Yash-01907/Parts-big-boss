"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Search, CheckCircle2 } from "lucide-react";
import { CompatibleVehicle } from "@/app/types/product";

interface CompatibilityTableClientProps {
  vehicles: CompatibleVehicle[];
}

export default function CompatibilityTableClient({
  vehicles,
}: CompatibilityTableClientProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(10);

  // Filter vehicles based on search
  const filteredVehicles = vehicles.filter((vehicle) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      vehicle.make_name.toLowerCase().includes(searchLower) ||
      vehicle.model_name.toLowerCase().includes(searchLower) ||
      vehicle.submodel?.toLowerCase().includes(searchLower)
    );
  });

  const displayedVehicles = filteredVehicles.slice(0, visibleCount);
  const hasMore = filteredVehicles.length > visibleCount;

  return (
    <>
      {/* Expand/Collapse Button - Clean & Full Width */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-center gap-2 border-b border-zinc-100 bg-white p-4 transition-colors hover:bg-zinc-50 active:bg-zinc-100"
      >
        <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
          {isExpanded ? "Hide" : "Show"} Details
        </span>
        {isExpanded ? (
          <ChevronUp className="text-zinc-400" size={16} />
        ) : (
          <ChevronDown className="text-zinc-400" size={16} />
        )}
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="bg-white">
          {/* Search Bar - Sticky-ish feel */}
          <div className="border-b border-zinc-100 bg-white p-5">
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search by make, model, or variant..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setVisibleCount(10);
                }}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 py-3 pl-11 pr-4 text-sm font-medium text-zinc-900 shadow-sm transition-all placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900"
              />
            </div>
          </div>

          {/* Table View (Desktop) */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-left">
              <thead className="bg-zinc-50 border-b border-zinc-200">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    Make
                  </th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    Model
                  </th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    Year Range
                  </th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    Variant
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {displayedVehicles.length > 0 ? (
                  displayedVehicles.map((vehicle, index) => (
                    <tr
                      key={index}
                      className="group transition-colors hover:bg-zinc-50"
                    >
                      <td className="px-6 py-4 text-sm font-bold text-zinc-900">
                        {vehicle.make_name}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-zinc-700">
                        {vehicle.model_name}
                      </td>
                      <td className="px-6 py-4 text-sm text-zinc-600">
                        <span className="inline-flex items-center rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-bold text-zinc-800">
                          {vehicle.year_from === vehicle.year_to
                            ? vehicle.year_from
                            : `${vehicle.year_from} - ${vehicle.year_to}`}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-zinc-500">
                        {vehicle.submodel || (
                          <span className="text-zinc-400 italic text-xs">
                            Base
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-12 text-center text-zinc-500"
                    >
                      No vehicles found matching "{searchTerm}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View - Optimized */}
          <div className="divide-y divide-zinc-100 md:hidden">
            {displayedVehicles.length > 0 ? (
              displayedVehicles.map((vehicle, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-3 p-5 transition-colors hover:bg-zinc-50"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-zinc-900 text-sm">
                        {vehicle.make_name} {vehicle.model_name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="px-2 py-0.5 rounded bg-zinc-100 text-[10px] font-bold text-zinc-600">
                          {vehicle.year_from === vehicle.year_to
                            ? vehicle.year_from
                            : `${vehicle.year_from}-${vehicle.year_to}`}
                        </span>
                      </div>
                    </div>
                    {/* Visual Checkmark for "Fits" feel */}
                    <div className="h-8 w-8 flex items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <CheckCircle2 size={16} />
                    </div>
                  </div>

                  {vehicle.submodel && (
                    <div className="flex items-center gap-2 pt-2 border-t border-zinc-50">
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                        Variant:
                      </span>
                      <p className="text-xs font-medium text-zinc-600">
                        {vehicle.submodel}
                      </p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="px-6 py-12 text-center text-zinc-500">
                No vehicles found matching "{searchTerm}"
              </div>
            )}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="border-t border-zinc-100 bg-zinc-50 p-4 text-center">
              <button
                onClick={() => setVisibleCount((prev) => prev + 10)}
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-zinc-900 shadow-sm border border-zinc-200 transition-all hover:bg-zinc-50 hover:border-zinc-300"
              >
                Show {Math.min(10, filteredVehicles.length - visibleCount)} more
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
