"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Zap, Trash2, Gauge, Settings2, Fuel } from "lucide-react";
import { authStore, useAuthStore } from "../../store/useAuthStore";
import { toast } from "sonner";
import { UserVehicle } from "../../types/vehicle";
interface GarageVehicleCardProps {
  vehicle: UserVehicle;
  index: number;
}

export function GarageVehicleCard({
  vehicle,
  index = 0,
}: GarageVehicleCardProps) {
  // Local images (mapped deterministically)
  const CAR_IMAGES = ["/Cars/Car 1.png", "/Cars/Car 2.png", "/Cars/Car 3.png"];
  const vehicleImage =
    CAR_IMAGES[vehicle.id % CAR_IMAGES.length] || CAR_IMAGES[0];

  const handleToggle = () => {
    if (vehicle.shop_for) {
      // If currently active, turn it OFF
      authStore.switchActiveVehicle(-1);
      toast.success("Vehicle deactivated");
    } else {
      // If currently inactive, turn it ON
      authStore.switchActiveVehicle(vehicle.id);
      toast.success(`${vehicle.nickname || "Vehicle"} is now active`);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`
        group relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-300
        ${
          vehicle.shop_for
            ? "border-[var(--accent)] bg-[#0f172a] shadow-[0_0_20px_rgba(var(--accent-rgb),0.15)] ring-1 ring-[var(--accent)]"
            : "border-white/5 bg-[#0f172a]/40 hover:bg-[#0f172a]/60 hover:border-white/10"
        }
      `}
    >
      <div className="relative h-40 w-full bg-slate-900 overflow-hidden">
        <Image
          src={vehicleImage}
          alt={vehicle.nickname || "Vehicle"}
          fill
          className={`object-cover transition-transform duration-700 ${
            vehicle.shop_for
              ? "scale-105"
              : "grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-105"
          }`}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-80" />

        {/* Status Badge (Only shows if active) */}
        {vehicle.shop_for && (
          <div className="absolute top-3 right-3 bg-[var(--accent)] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-lg flex items-center gap-1">
            <Zap size={10} fill="currentColor" /> Active
          </div>
        )}
      </div>

      {/* 2. Content Body */}
      <div className="flex flex-1 flex-col p-4">
        {/* Header & Toggle Row */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3
              className={`font-bold text-base line-clamp-1 ${
                vehicle.shop_for ? "text-white" : "text-gray-300"
              }`}
            >
              {vehicle.nickname || vehicle.model_name}
            </h3>
            <p className="text-xs text-gray-500">
              {vehicle.year} {vehicle.make_name}
            </p>
          </div>

          {/* THE TOGGLE SWITCH */}
          <button
            onClick={handleToggle}
            type="button"
            className={`
    relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent 
    transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-gray-900
    ${vehicle.shop_for ? "bg-[var(--accent)]" : "bg-white/10 hover:bg-white/20"}
  `}
          >
            <span className="sr-only">Toggle shop for</span>
            <span
              aria-hidden="true"
              className={`
      pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-md transform ring-0 transition duration-200 ease-in-out
      ${vehicle.shop_for ? "translate-x-5" : "translate-x-0"}
    `}
            />
          </button>
        </div>

        {/* Mini Specs Grid */}
        <div className="grid grid-cols-3 gap-1 py-3 border-t border-b border-white/5 mb-3">
          <div className="flex flex-col items-center p-1.5 rounded bg-white/5">
            <Gauge size={14} className="text-gray-400 mb-1" />
            <span className="text-[10px] text-gray-300">45k</span>
          </div>
          <div className="flex flex-col items-center p-1.5 rounded bg-white/5">
            <Settings2 size={14} className="text-gray-400 mb-1" />
            <span className="text-[10px] text-gray-300">Auto</span>
          </div>
          <div className="flex flex-col items-center p-1.5 rounded bg-white/5">
            <Fuel size={14} className="text-gray-400 mb-1" />
            <span className="text-[10px] text-gray-300">Gas</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-auto flex items-center justify-between">
          <span className="text-[10px] font-mono text-gray-600">
            ID: {vehicle.id}
          </span>

          <button
            onClick={() => authStore.removeVehicle(vehicle.id)}
            className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors opacity-0 group-hover:opacity-100"
            title="Delete Vehicle"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Smart Component: Connects to store to display the ACTIVE vehicle only.
 * Used on the Dashboard Top.
 */
export default function ActiveVehicleCard() {
  const { activeVehicle, userGarage } = useAuthStore();

  // 1. Garage is Totally Empty
  if (userGarage.length === 0) {
    return (
      <div className="h-full min-h-[300px] border border-dashed border-[var(--border)] rounded-2xl p-8 bg-[var(--surface)] flex flex-col items-center justify-center text-center gap-4">
        <div className="p-4 rounded-full bg-[var(--surface-hover)]">
          <Zap size={24} className="text-[var(--text-muted)]" />
        </div>
        <div>
          <h3 className="text-lg font-medium text-[var(--foreground)]">
            Garage is Empty
          </h3>
          <p className="text-[var(--text-secondary)] text-sm mt-1">
            Add a vehicle to get started.
          </p>
        </div>
      </div>
    );
  }

  // 2. Garage has cars, but NONE are Active
  if (!activeVehicle) {
    return (
      <div className="h-full min-h-[300px] border border-white/10 bg-[#0f172a]/40 backdrop-blur-md rounded-2xl p-8 flex flex-col items-center justify-center text-center gap-4">
        <div className="p-4 rounded-full bg-white/5">
          <Zap size={24} className="text-gray-500" />
        </div>
        <div>
          <h3 className="text-lg font-medium text-white">No Active Vehicle</h3>
          <p className="text-gray-400 text-sm mt-1">
            Select a vehicle to see details here.
          </p>
        </div>
      </div>
    );
  }

  // 3. Render the Active Vehicle using the Reusable Card
  return <GarageVehicleCard vehicle={activeVehicle} index={0} />;
}
