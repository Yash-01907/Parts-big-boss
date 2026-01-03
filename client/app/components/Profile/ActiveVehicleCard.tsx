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

  // Determine which vehicle to display: either the active one, or the first one in the garage
  const displayVehicle =
    activeVehicle || (userGarage.length > 0 ? userGarage[0] : null);

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
      } else {
        // Activate this specific vehicle
        authStore.switchActiveVehicle(displayVehicle.id);
        toast.success("Vehicle activated");
      }
    }
  };

  const handleSaveNickname = () => {
    setIsEditing(false);
    // Ideally call API here to save nickname
    toast.success("Nickname updated (Local only)");
  };

  // Only show empty state if there are absolutely NO vehicles in the garage
  if (!displayVehicle) {
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

  return (
    <div className="group relative w-full overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] transition-shadow hover:shadow-md grid grid-cols-1 lg:grid-cols-12 min-h-[380px]">
      {/* IMAGE */}
      <div className="relative col-span-1 lg:col-span-4 h-64 lg:h-auto bg-gray-100 overflow-hidden">
        <Image
          src={vehicleImage}
          alt={displayVehicle.model_name || "Vehicle Image"}
          fill
          className="object-cover"
          priority
        />

        {/* Subtle gradient only on mobile */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent lg:hidden" />
      </div>

      {/* CONTENT */}
      <div className="col-span-1 lg:col-span-8 p-6 md:p-10 flex flex-col justify-center gap-5 relative">
        {/* HEADER ROW */}
        <div className="flex items-center justify-between">
          {/* Status */}
          <div className="flex items-center gap-3">
            <span
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wider ${
                displayVehicle.is_active
                  ? "bg-[var(--accent)] text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {displayVehicle.is_active ? "Active" : "Inactive"}
            </span>

            <span className="text-xs text-[var(--text-muted)] font-mono">
              #{displayVehicle.id}
            </span>
          </div>

          {/* Toggle (desktop only, calmer placement) */}
          <button
            onClick={handleToggleActive}
            className={`hidden lg:flex w-11 h-6 rounded-full px-1 items-center transition-colors ${
              displayVehicle.is_active ? "bg-[var(--accent)]" : "bg-gray-400"
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
              className="w-full text-3xl md:text-5xl font-serif font-bold bg-transparent border-b-2 border-[var(--accent)] outline-none"
            />
          ) : (
            <h1
              onClick={() => setIsEditing(true)}
              className="text-3xl md:text-5xl font-serif font-bold text-[var(--foreground)] cursor-pointer flex items-center gap-2"
            >
              {nickname}
              <Edit2
                size={18}
                className="text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition"
              />
            </h1>
          )}
        </div>

        {/* DETAILS */}
        <div className="pt-4 border-t border-[var(--border)]">
          <p className="text-lg text-[var(--text-secondary)]">
            {displayVehicle.year} {displayVehicle.make_name}{" "}
            <span className="text-[var(--foreground)] font-medium">
              {displayVehicle.model_name}
            </span>
          </p>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            {displayVehicle.submodel || "Standard Configuration"}
          </p>
        </div>
      </div>
    </div>
  );
}
