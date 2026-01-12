"use client";

import { motion } from "framer-motion";
import { Car, X } from "lucide-react";
import { api } from "../../axios/axiosConfig";
import { useAuthStore, authStore } from "../../store/useAuthStore";
import { toast } from "sonner";

export default function GarageList() {
  const { userGarage } = useAuthStore();

  const handleSwitchVehicle = (vehicleId: number) => {
    authStore.switchActiveVehicle(vehicleId);
    toast.success("Active vehicle updated");
  };

  const handleRemoveVehicle = async (vehicleId: number) => {
    try {
      await api.delete(`/api/user/vehicles/${vehicleId}`);
      authStore.removeVehicle(vehicleId);
      toast.success("Vehicle removed");
    } catch (error) {
      toast.error("Failed to remove vehicle");
      console.error(error);
    }
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
            userGarage.map(
              (vehicle) => (
                console.log(vehicle.shop_for),
                (
                  <motion.div
                    key={vehicle.id}
                    layoutId={`vehicle-pill-${vehicle.id}`}
                    onClick={() => handleSwitchVehicle(vehicle.id)}
                    className={`
                  group relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 border shrink-0 
                  flex items-center gap-2 cursor-pointer select-none
                  ${
                    vehicle.shop_for
                      ? "bg-zinc-900 text-white border-zinc-900 shadow-md ring-1 ring-zinc-900/20"
                      : "bg-zinc-50 text-zinc-500 border-zinc-200 hover:bg-white hover:border-zinc-400 hover:text-zinc-900 hover:shadow-sm"
                  }
                  
                `}
                  >
                    {vehicle.shop_for && (
                      <motion.div
                        layoutId="active-dot"
                        className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_2px_rgba(239,68,68,0.4)]"
                      />
                    )}
                    <span className="truncate max-w-[150px]">
                      {vehicle.nickname || vehicle.model_name || "Vehicle"}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveVehicle(vehicle.id);
                      }}
                      className={`
                    ml-1 p-0.5 rounded-full transition-all duration-200
                    opacity-0 group-hover:opacity-100 flex items-center justify-center
                    ${
                      vehicle.shop_for
                        ? "text-zinc-400 hover:text-white hover:bg-white/20"
                        : "text-zinc-400 hover:text-red-600 hover:bg-red-50"
                    }
                  `}
                      aria-label="Remove vehicle"
                    >
                      <X size={14} />
                    </button>
                  </motion.div>
                )
              )
            )
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
