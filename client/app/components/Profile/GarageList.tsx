"use client";

import { motion } from "framer-motion";
import { Car } from "lucide-react";
import { useAuthStore, authStore } from "../../store/useAuthStore";
import { toast } from "sonner";

export default function GarageList() {
  const { userGarage } = useAuthStore();

  const handleSwitchVehicle = (vehicleId: number) => {
    authStore.switchActiveVehicle(vehicleId);
    toast.success("Active vehicle updated");
  };

  return (
    <div className="w-full border border-[var(--border)] rounded-2xl p-3 bg-[var(--surface)] shadow-sm">
      <div className="flex items-center gap-4">
        {/* Label icon */}
        <div className="hidden md:flex items-center gap-2 text-[var(--text-muted)] px-2 border-r border-[var(--border)] shrink-0">
          <Car size={16} />
          <span className="text-sm font-medium uppercase tracking-wider">
            Garage
          </span>
        </div>

        {/* Vehicle Pills */}
        <div className="flex-1 flex-wrap min-w-0 flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[var(--border)] scrollbar-track-transparent">
          {userGarage.length > 0 ? (
            userGarage.map((vehicle) => (
              <motion.button
                key={vehicle.id}
                layoutId={`vehicle-pill-${vehicle.id}`}
                onClick={() => handleSwitchVehicle(vehicle.id)}
                className={`
                  relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border shrink-0 
                  flex items-center gap-2
                  ${
                    vehicle.is_active
                      ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)] shadow-sm"
                      : "bg-[var(--background)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--foreground)]"
                  }
                `}
              >
                {vehicle.is_active && (
                  <motion.div
                    layoutId="active-dot"
                    className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"
                  />
                )}
                <span className="truncate max-w-[150px]">
                  {vehicle.nickname || vehicle.model_name || "Vehicle"}
                </span>
              </motion.button>
            ))
          ) : (
            <span className="text-sm text-[var(--text-muted)] italic px-2">
              No vehicles saved.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
