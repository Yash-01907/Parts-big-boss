"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import axios from "axios";
import VehicleSelector, { VehicleSelection } from "../Sections/VehicleSelector";

export default function AddVehicleSection() {
  const [isAddingCar, setIsAddingCar] = useState(false);

  const handleConfirmAddVehicle = async (selection: VehicleSelection) => {
    try {
      const payload = {
        variantId: selection.variantId,
        nickname: `${selection.makeName} ${selection.modelName}`,
      };
      console.log(payload);
      await axios.post(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
        }/api/user/vehicles`,
        payload,
        { withCredentials: true }
      );

      toast.success("Vehicle added successfully!");
      setIsAddingCar(false);
      // Hard reload to re-run the Server Side Fetch and update the UI
      window.location.reload();
    } catch (error) {
      console.error("Failed to add vehicle", error);
      toast.error("Failed to add vehicle. Please try again.");
    }
  };

  return (
    <>
      <div className="w-full h-full">
        <button
          onClick={() => setIsAddingCar(true)}
          className="w-full h-full border border-dashed border-[var(--border)] rounded-2xl p-4 bg-[var(--surface)] hover:bg-[var(--surface-hover)] hover:border-[var(--accent)] text-[var(--text-muted)] hover:text-[var(--accent)] transition-all flex flex-col items-center justify-center gap-2 group"
        >
          <div className="p-2 rounded-full bg-[var(--background)] group-hover:bg-[var(--accent)]/10 transition-colors">
            <Plus size={24} />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider">
            Add Vehicle
          </span>
        </button>
      </div>

      {isAddingCar && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl relative overflow-hidden"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-xl text-black">Add to Garage</h3>
              <button
                onClick={() => setIsAddingCar(false)}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <VehicleSelector
              variant="modal"
              onConfirm={handleConfirmAddVehicle}
            />
          </motion.div>
        </div>
      )}
    </>
  );
}
