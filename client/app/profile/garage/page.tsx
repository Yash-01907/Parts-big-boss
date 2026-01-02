"use client";

import { useAuthStore } from "../../store/useAuthStore";
import { Car, AlertTriangle } from "lucide-react";

export default function GaragePage() {
  const { userGarage } = useAuthStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[var(--foreground)]">My Garage</h1>
        <p className="text-[var(--text-secondary)]">Manage your vehicle collection</p>
      </div>

      {userGarage.length === 0 ? (
        <div className="p-12 rounded-2xl bg-white border border-[var(--border)] text-center flex flex-col items-center justify-center space-y-4">
           <div className="p-4 bg-gray-50 rounded-full">
             <Car size={32} className="text-[var(--text-muted)]" />
           </div>
           <div>
             <h3 className="text-lg font-bold text-[var(--foreground)]">Garage Empty</h3>
             <p className="text-sm text-[var(--text-secondary)]">Add a vehicle to start finding parts.</p>
           </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userGarage.map((car) => (
             <div key={car.id} className="p-4 rounded-2xl bg-white border border-[var(--border)] shadow-sm">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-[var(--surface)] rounded-lg">
                     <Car size={20} />
                   </div>
                   <div>
                      <p className="font-bold">{car.nickname || `${car.year} ${car.model_name}`}</p>
                      <p className="text-xs text-[var(--text-muted)]">{car.variant_name}</p>
                   </div>
                </div>
             </div>
          ))}
        </div>
      )}
    </div>
  );
}
