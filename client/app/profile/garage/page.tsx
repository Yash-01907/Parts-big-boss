"use client";

import { useAuthStore } from "../../store/useAuthStore";
import { Car, CloudCog } from "lucide-react";
import AddVehicleSection from "../../components/Profile/AddVehicleSelection";
import { GarageVehicleCard } from "../../components/Profile/ActiveVehicleCard";

export default function GaragePage() {
  const { userGarage } = useAuthStore();
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
          {userGarage.map((vehicle, index) => (
            <GarageVehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
}
