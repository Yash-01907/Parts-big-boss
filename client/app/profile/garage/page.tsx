"use client";

import { useAuthStore, authStore } from "../../store/useAuthStore";
import { Car, CheckCircle2, MoreVertical, Trash2, Zap } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { toast } from "sonner";
import AddVehicleSection from "../../components/Profile/AddVehicleSelection";

export default function GaragePage() {
  const { userGarage } = useAuthStore();

  const handleSetActive = (id: number) => {
    authStore.switchActiveVehicle(id);
    toast.success("Active vehicle updated");
  };

  const CAR_IMAGES = ["/Cars/Car 1.png", "/Cars/Car 2.png", "/Cars/Car 3.png"];

  return (
    <div className="w-full min-h-[calc(100vh-6rem)] bg-[var(--background)] p-4 lg:p-8 rounded-xl flex flex-col gap-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--border)] pb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[var(--foreground)]">
            My Garage
          </h1>
          <p className="text-[var(--text-secondary)] mt-2">
            Manage your vehicle collection and settings.
          </p>
        </div>
        <div className="w-full md:w-auto h-12">
          <AddVehicleSection />
        </div>
      </div>

      {/* Vehicle Grid */}
      {userGarage.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed border-[var(--border)] rounded-3xl bg-[var(--surface)]">
          <div className="p-6 bg-[var(--surface-hover)] rounded-full mb-4">
            <Car size={48} className="text-[var(--text-muted)]" />
          </div>
          <h3 className="text-xl font-bold text-[var(--foreground)]">
            Garage Empty
          </h3>
          <p className="text-[var(--text-secondary)] mt-1 mb-6">
            Add your first vehicle to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userGarage.map((vehicle, index) => {
            const vehicleImage = CAR_IMAGES[vehicle.id % CAR_IMAGES.length];

            return (
              <motion.div
                key={vehicle.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  group relative flex flex-col overflow-hidden rounded-3xl border transition-all duration-300
                  ${
                    vehicle.is_active
                      ? "border-[var(--accent)] bg-[var(--surface)] shadow-[0_0_20px_rgba(0,0,0,0.05)] ring-1 ring-[var(--accent)]"
                      : "border-[var(--border)] bg-[var(--background)] hover:border-[var(--accent)]/50 hover:shadow-lg"
                  }
                `}
              >
                {/* Image Area */}
                <div className="relative h-48 w-full bg-gray-50">
                  <Image
                    src={vehicleImage}
                    alt={vehicle.model_name || "Car"}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)]/80 to-transparent" />

                  {vehicle.is_active && (
                    <div className="absolute top-4 right-4 bg-[var(--accent)] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg flex items-center gap-1">
                      <Zap size={12} fill="currentColor" /> Active
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 p-6 flex flex-col relative z-10 -mt-12">
                  <div className="bg-[var(--surface)] backdrop-blur-sm p-4 rounded-xl border border-[var(--border)] shadow-sm">
                    <h3
                      className="text-xl font-bold text-[var(--foreground)] line-clamp-1"
                      title={vehicle.nickname || vehicle.model_name || ""}
                    >
                      {vehicle.nickname || vehicle.model_name}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">
                      {vehicle.year} {vehicle.make_name} {vehicle.model_name}
                    </p>

                    <div className="mt-4 pt-4 border-t border-[var(--border)] flex items-center justify-between">
                      <span className="text-xs font-mono text-[var(--text-muted)] bg-[var(--surface-hover)] px-2 py-1 rounded">
                        ID: {vehicle.id}
                      </span>

                      {!vehicle.is_active && (
                        <button
                          onClick={() => handleSetActive(vehicle.id)}
                          className="text-xs font-semibold text-[var(--accent)] hover:text-[var(--accent)]/80 hover:underline transition-all"
                        >
                          Set as Active
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Actions (Hidden by default, shown on hover/focus) */}
                  <div className="mt-4 flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      className="p-2 text-[var(--text-muted)] hover:text-red-500 transition-colors"
                      title="Delete Vehicle"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
