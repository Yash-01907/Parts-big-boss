"use client";

import { useAuthStore, authStore } from "../../store/useAuthStore";
import { Car, MoreVertical, Plus, Trash2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { api } from "../../axios/axiosConfig";
import { useState } from "react";
import AddVehicleSection from "./AddVehicleSelection"; // Reusing existing modal logic
import VehicleSelector, { VehicleSelection } from "../Sections/VehicleSelector";
import axios from "axios";

export default function MyGarage() {
  const { userGarage } = useAuthStore();
  const [showAddModal, setShowAddModal] = useState(false);

  // Separate active vs other vehicles if needed, but for now just list them beautifully
  // Sort so active is first
  const sortedGarage = [...userGarage].sort((a, b) =>
    a.shop_for === b.shop_for ? 0 : a.shop_for ? -1 : 1,
  );

  const handleSetDefault = (id: number) => {
    authStore.switchActiveVehicle(id);
    toast.success("Active vehicle updated");
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/api/user/vehicles/${id}`);
      authStore.removeVehicle(id);
      toast.success("Vehicle removed from your garage");
    } catch (error) {
      toast.error("Failed to remove vehicle");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-zinc-900">My Garage</h2>
          <p className="text-sm text-zinc-500">
            Manage your vehicles to find compatible parts quickly.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-black hover:bg-zinc-800 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus size={18} />
          <span>Add New Vehicle</span>
        </button>
      </div>

      {sortedGarage.length === 0 ? (
        <div className="text-center py-16 bg-zinc-50 rounded-xl border-2 border-dashed border-zinc-200">
          <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Car className="text-zinc-400 w-8 h-8" />
          </div>
          <h3 className="text-lg font-medium text-zinc-900">
            Your garage is empty
          </h3>
          <p className="text-zinc-500 max-w-sm mx-auto mt-2 mb-6">
            Add a vehicle to filter parts specifically designed for your car.
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="text-indigo-600 font-medium hover:underline hover:text-indigo-700"
          >
            Add your first vehicle now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          <AnimatePresence>
            {sortedGarage.map((vehicle) => (
              <motion.div
                layout
                key={vehicle.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`
                  relative group flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-xl border transition-all duration-200
                  ${
                    vehicle.shop_for
                      ? "bg-indigo-50/30 border-indigo-200 shadow-sm ring-1 ring-indigo-500/10"
                      : "bg-white border-zinc-200 hover:border-zinc-300 hover:shadow-sm"
                  }
                `}
              >
                <div className="flex items-start md:items-center gap-4">
                  {/* Icon Box */}
                  <div
                    className={`
                    w-12 h-12 rounded-lg flex items-center justify-center text-xl shrink-0
                    ${
                      vehicle.shop_for
                        ? "bg-indigo-100 text-indigo-600"
                        : "bg-zinc-100 text-zinc-500"
                    }
                  `}
                  >
                    <Car size={24} />
                  </div>

                  {/* Vehicle Details */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-zinc-900 text-lg">
                        {vehicle.nickname ||
                          `${vehicle.year || ""} ${vehicle.make_name || ""} ${
                            vehicle.model_name || "Unknown Model"
                          }`}
                      </h3>
                      {vehicle.shop_for && (
                        <span className="inline-flex items-center gap-1 bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide uppercase">
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-zinc-500">
                      {vehicle.variant_name || "Standard Variant"}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 md:pl-6 md:border-l md:border-zinc-100 pt-4 md:pt-0 border-t border-zinc-100 md:border-t-0 mt-4 md:mt-0">
                  <button
                    onClick={() =>
                      !vehicle.shop_for && handleSetDefault(vehicle.id)
                    }
                    disabled={!!vehicle.shop_for}
                    className={`
                      flex-1 md:flex-none text-sm font-medium px-4 py-2 rounded-lg transition-colors border
                      ${
                        vehicle.shop_for
                          ? "bg-transparent border-transparent text-indigo-600 cursor-default"
                          : "bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300"
                      }
                    `}
                  >
                    {vehicle.shop_for ? (
                      <span className="flex items-center gap-2">
                        <CheckCircle2 size={16} /> Shopping for this
                      </span>
                    ) : (
                      "Set as Active"
                    )}
                  </button>

                  <button
                    onClick={() => handleDelete(vehicle.id)}
                    className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remove Vehicle"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Hidden Modal Trigger logic wrappers could exist here, 
          but usually better to lift state or use a portal. 
          For now, we'll assume AddVehicleSection handles its own modal or use a custom one.
          Actually, checking AddVehicleSection, it has an internal state `isAddingCar`.
          We can force it open or pass a prop if we modify it.
          Let's assume we modify AddVehicleSelection to accept `isOpen` or we just render it hidden and let it control itself?
          Wait, the AddVehicleSection in the fileview has internal state: const [isAddingCar, setIsAddingCar] = useState(false);
          I'll need to modify it or create a wrapper. 
          For simplicity in this step, I'll modify AddVehicleSelection to export the Modal part separately or accept props.
      */}
      {/* 
        Hack: The previous file `AddVehicleSelection` has a button trigger built-in. 
        I want to use my own trigger. 
        I'll create a new component `AddVehicleModal` or just copy the logic since it's simple. 
        Actually, let's just implement the modal logic here using the `VehicleSelector` component.
      */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl relative overflow-hidden"
          >
            {/* 
              We need to import VehicleSelection/VehicleSelector.
              I'll assume it exists at ../Sections/VehicleSelector based on previous file view.
            */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-xl text-black">Add to Garage</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition-colors"
              >
                <Plus className="rotate-45" size={18} />
              </button>
            </div>
            {/* 
              I am assuming AddVehicleSelection.tsx imports VehicleSelector from "../Sections/VehicleSelector".
              I will do the same.
             */}
            <AddVehicleSectionWrapper
              onComplete={() => {
                setShowAddModal(false);
                // Trigger refresh or store update
                window.location.reload();
              }}
            />
          </motion.div>
        </div>
      )}
    </div>
  );
}

function AddVehicleSectionWrapper({ onComplete }: { onComplete: () => void }) {
  const handleConfirm = async (selection: VehicleSelection) => {
    try {
      const payload = {
        variantId: selection.variantId,
        nickname: `${selection.makeName} ${selection.modelName}`,
      };
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/user/vehicles`,
        payload,
        { withCredentials: true },
      );
      toast.success("Vehicle added successfully!");
      onComplete();
    } catch (error) {
      toast.error("Failed to add vehicle.");
    }
  };

  return <VehicleSelector variant="modal" onConfirm={handleConfirm} />;
}
