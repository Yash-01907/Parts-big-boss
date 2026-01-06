"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Car, MonitorCheck, Edit2 } from "lucide-react";
import { useAuthStore, authStore } from "../../store/useAuthStore";
import { toast } from "sonner";

export default function ActiveVehicleCard() {
  const { activeVehicle, userGarage } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState("");

  // Only display the strictly ACTIVE vehicle.
  // If no vehicle is active, we show a specific state/placeholder.
  const displayVehicle = activeVehicle;

  // Sync state with display vehicle
  useEffect(() => {
    if (displayVehicle) {
      setNickname(
        displayVehicle.nickname || displayVehicle.model_name || "My Vehicle"
      );
    }
  }, [displayVehicle]);

  // Available local car images
  const CAR_IMAGES = ["/Cars/Car 1.png", "/Cars/Car 2.png", "/Cars/Car 3.png"];

  // Deterministically select an image based on vehicle ID
  const vehicleImage = displayVehicle
    ? CAR_IMAGES[displayVehicle.id % CAR_IMAGES.length]
    : CAR_IMAGES[0];

  const handleToggleActive = () => {
    if (displayVehicle) {
      if (displayVehicle.is_active) {
        // Deactivate
        authStore.switchActiveVehicle(-1);
        toast.success("Vehicle deactivated");
      }
      // Note: We don't need 'Activate' logic here because this card only shows IF active.
      // Activation happens via the GarageList below.
    }
  };

  const handleSaveNickname = () => {
    setIsEditing(false);
    // Ideally call API here to save nickname
    toast.success("Nickname updated (Local only)");
  };

  // 1. Garage is Totally Empty
  if (userGarage.length === 0) {
    return (
      <div className="h-full min-h-[400px] border border-dashed border-[var(--border)] rounded-3xl p-8 bg-[var(--surface)] flex flex-col items-center justify-center text-center gap-4">
        <div className="p-4 rounded-full bg-[var(--surface-hover)]">
          <Car size={32} className="text-[var(--text-muted)]" />
        </div>
        <div>
          <h3 className="text-xl font-medium text-[var(--foreground)]">
            Garage is Empty
          </h3>
          <p className="text-[var(--text-secondary)] text-sm mt-1">
            Add a vehicle to your garage to get started.
          </p>
        </div>
      </div>
    );
  }

  // 2. Garage has cars, but NONE are Active
  if (!displayVehicle) {
    return (
      <div className="h-full min-h-[400px] border border-white/10 bg-[#0f172a]/40 backdrop-blur-md rounded-3xl p-8 flex flex-col items-center justify-center text-center gap-4">
        <div className="p-4 rounded-full bg-white/5">
          <Car size={32} className="text-gray-400" />
        </div>
        <div>
          <h3 className="text-xl font-medium text-white">No Active Vehicle</h3>
          <p className="text-gray-400 text-sm mt-1">
            Select a vehicle from your garage list below to activate it.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative w-full overflow-hidden rounded-3xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-md transition-shadow hover:shadow-lg grid grid-cols-1 lg:grid-cols-12 min-h-[380px]">
      {/* IMAGE */}
      <div className="relative col-span-1 lg:col-span-4 h-64 lg:h-auto bg-[#0f172a] overflow-hidden">
        <Image
          src={vehicleImage}
          alt={displayVehicle.model_name || "Vehicle Image"}
          fill
          className="object-cover"
          priority
        />

        {/* Subtle gradient only on mobile */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent lg:hidden" />
      </div>

      {/* CONTENT */}
      <div className="col-span-1 lg:col-span-8 p-6 md:p-10 flex flex-col justify-center gap-5 relative">
        {/* HEADER ROW */}
        <div className="flex items-center justify-between">
          {/* Status */}
          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm ${
                displayVehicle.is_active
                  ? "bg-[var(--accent)] text-white"
                  : "bg-white/10 text-gray-400"
              }`}
            >
              {displayVehicle.is_active && (
                <Car size={12} fill="currentColor" />
              )}
              {displayVehicle.is_active ? "Active" : "Inactive"}
            </span>

            <span className="text-xs text-gray-400 font-mono">
              #{displayVehicle.id}
            </span>
          </div>

          {/* Toggle (desktop only, calmer placement) */}
          <button
            onClick={handleToggleActive}
            className={`hidden lg:flex w-11 h-6 rounded-full px-1 items-center transition-colors ${
              displayVehicle.is_active ? "bg-[var(--accent)]" : "bg-white/20"
            }`}
          >
            <motion.div
              layout
              className="w-4 h-4 bg-white rounded-full shadow"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              style={{
                marginLeft: displayVehicle.is_active ? "auto" : "0",
                marginRight: displayVehicle.is_active ? "0" : "auto",
              }}
            />
          </button>
        </div>

        {/* TITLE */}
        <div>
          {isEditing ? (
            <input
              autoFocus
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              onBlur={handleSaveNickname}
              onKeyDown={(e) => e.key === "Enter" && handleSaveNickname()}
              className="w-full text-3xl md:text-5xl font-serif font-bold bg-transparent text-white border-b-2 border-[var(--accent)] outline-none"
            />
          ) : (
            <h1
              onClick={() => setIsEditing(true)}
              className="text-3xl md:text-5xl font-serif font-bold text-white cursor-pointer flex items-center gap-2"
            >
              {nickname}
              <Edit2
                size={18}
                className="text-gray-400 opacity-0 group-hover:opacity-100 transition"
              />
            </h1>
          )}
        </div>

        {/* DETAILS */}
        <div className="pt-4 border-t border-white/10">
          <p className="text-lg text-gray-300">
            {displayVehicle.year} {displayVehicle.make_name}{" "}
            <span className="text-white font-medium">
              {displayVehicle.model_name}
            </span>
          </p>
          <p className="text-sm text-gray-400 mt-1">
            {displayVehicle.submodel || "Standard Configuration"}
          </p>
        </div>
      </div>
    </div>
  );
}
