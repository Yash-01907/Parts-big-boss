"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Car,
  Plus,
  CheckCircle2,
  Package,
  Settings,
  Zap,
  X,
} from "lucide-react";
import Link from "next/link";
import { useAuthStore, authStore } from "../store/useAuthStore";
import { toast } from "sonner";
import axios from "axios";
import VehicleSelector from "../components/Sections/VehicleSelector";

export default function ProfileDashboard() {
  const { userGarage, activeVehicle } = useAuthStore();
  const [isAddingCar, setIsAddingCar] = useState(false);

  // === 1. LOGIC: Switch Active Vehicle ===
  const handleSwitchVehicle = (vehicleId: number) => {
    authStore.switchActiveVehicle(vehicleId);
    toast.success("Active vehicle updated");
  };

  // === 2. LOGIC: Add Vehicle (From your old file) ===
  const handleConfirmAddVehicle = async (selection: any) => {
    try {
      const payload = {
        variantId: selection.variantId,
        nickname: `${selection.makeName} ${selection.modelName}`,
      };

      // Call API
      await axios.post(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
        }/api/user/vehicles`,
        payload,
        { withCredentials: true }
      );

      // Success Feedback
      toast.success("Vehicle added successfully!");
      setIsAddingCar(false);

      // Refresh Page to show new vehicle (or call a store refresh method if available)
      window.location.reload();
    } catch (error) {
      console.error("Failed to add vehicle", error);
      toast.error("Failed to add vehicle. Please try again.");
    }
  };

  // Mock Orders Data (Placeholder for Part 3)
  const mockOrders = [
    {
      id: "ORD-7782",
      date: "Oct 24, 2025",
      items: "Brake Pads, Oil Filter",
      status: "Delivered",
      amount: "$124.50",
    },
    {
      id: "ORD-9921",
      date: "Sep 12, 2025",
      items: "Spark Plugs (4)",
      status: "Shipped",
      amount: "$45.00",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:flex lg:flex-row w-full min-h-screen lg:h-[calc(100vh-6rem)] gap-4 bg-[var(--background)] py-6 px-4 rounded-xl">
      {/* === LEFT COLUMN (Part 1 & 3) === */}
      <div className="contents lg:flex lg:flex-col lg:w-2/3 gap-4 h-full">
        {/* PART 1: ACTIVE VEHICLE DETAILS */}
        <div className="order-2 col-span-2 h-auto min-h-[50vh] lg:h-[70%] border border-[var(--border)] rounded-3xl p-6 bg-gradient-to-br from-[var(--surface)] to-[var(--background)] shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <div className="relative z-10 flex flex-col h-full">
            <div className="flex justify-between items-start mb-6">
              <div>
                {/* Active Vehicle Toggle */}
                <div
                  className={`flex items-center gap-3 mb-2 w-fit ${
                    activeVehicle
                      ? "cursor-pointer"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                  onClick={() => activeVehicle && handleSwitchVehicle(-1)}
                >
                  <div
                    className={`w-11 h-6 rounded-full p-1 transition-colors ${
                      activeVehicle
                        ? "bg-[var(--accent)]"
                        : "bg-[var(--text-muted)]/20"
                    }`}
                  >
                    <motion.div
                      className="w-4 h-4 rounded-full bg-white shadow-sm"
                      animate={{ x: activeVehicle ? 20 : 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  </div>
                  <span className="inline-flex items-center gap-2 text-[var(--accent)] text-xs font-semibold uppercase tracking-wider">
                    <Zap
                      size={14}
                      className={
                        activeVehicle
                          ? "fill-[var(--accent)]"
                          : "fill-none grayscale"
                      }
                    />
                    Active Vehicle
                  </span>
                </div>
                <h1 className="text-3xl lg:text-5xl font-serif text-[var(--foreground)] leading-tight">
                  {activeVehicle?.nickname ||
                    activeVehicle?.model_name ||
                    "No Vehicle Selected"}
                </h1>
                <p className="text-[var(--text-secondary)] text-lg mt-1">
                  {activeVehicle
                    ? `${activeVehicle.submodel || activeVehicle.year || ""} ${
                        activeVehicle.make_name || ""
                      }`
                    : "Please select or add a vehicle to your garage."}
                </p>
              </div>
              {activeVehicle && (
                <button className="p-2 rounded-full hover:bg-[var(--surface-hover)] text-[var(--text-muted)] transition-colors">
                  <Settings size={20} />
                </button>
              )}
            </div>

            {/* Fitment Status */}
            {activeVehicle ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-auto">
                <div className="p-4 rounded-2xl bg-[var(--background)] border border-[var(--border)]">
                  <div className="text-[var(--text-muted)] text-xs uppercase tracking-wider mb-1">
                    Fitment
                  </div>
                  <div className="text-2xl font-semibold text-[var(--info)]">
                    {activeVehicle.fitment_completeness}%
                  </div>
                  <div className="w-full bg-[var(--surface-hover)] h-1.5 rounded-full mt-2 overflow-hidden">
                    <div
                      className="bg-[var(--info)] h-full rounded-full"
                      style={{
                        width: `${activeVehicle.fitment_completeness}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-[var(--background)] border border-[var(--border)]">
                  <div className="text-[var(--text-muted)] text-xs uppercase tracking-wider mb-1">
                    Status
                  </div>
                  <div className="text-xl font-medium text-[var(--foreground)] flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-green-500" /> Ready
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-auto flex items-center justify-center p-12 border-2 border-dashed border-[var(--border)] rounded-2xl">
                <div className="text-center">
                  <Car className="mx-auto h-12 w-12 text-[var(--text-muted)] mb-3" />
                  <h3 className="text-lg font-medium text-[var(--foreground)]">
                    Garage is Empty
                  </h3>
                  <p className="text-[var(--text-muted)] mb-4">
                    Add your first vehicle to get started.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* PART 3: RECENT ORDERS */}
        <div className="order-3 col-span-1 h-40 lg:flex-1 border border-[var(--border)] rounded-3xl p-5 bg-[var(--surface)] flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-serif text-[var(--foreground)]">
              Recent Orders
            </h2>
            <Link
              href="/orders"
              className="text-xs font-medium text-[var(--info)] hover:underline"
            >
              View All
            </Link>
          </div>
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {mockOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-[var(--background)] border border-[var(--border)]"
              >
                <div className="p-2 rounded-full bg-[var(--surface-hover)] text-[var(--accent)] shrink-0">
                  <Package size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-[var(--foreground)] truncate">
                    {order.items}
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">
                    {order.date}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold">{order.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* === RIGHT COLUMN (Part 2 & 4) === */}
      <div className="contents lg:flex lg:flex-col lg:flex-1 gap-4 h-full">
        {/* PART 2: GARAGE LIST (Navbar style on Mobile) */}
        <div className="order-1 col-span-2 h-auto lg:h-[90%] border border-[var(--border)] rounded-3xl p-4 bg-[var(--surface)] shadow-inner">
          <div className="flex items-center justify-between mb-4 lg:mb-6 px-1">
            <h2 className="text-xl font-serif text-[var(--foreground)]">
              My Garage
            </h2>
            <span className="bg-[var(--surface-hover)] text-[var(--text-secondary)] text-xs font-bold px-2 py-1 rounded-lg">
              {userGarage.length} Vehicles
            </span>
          </div>

          <div className="flex flex-row lg:flex-wrap gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide">
            {userGarage.length > 0 ? (
              userGarage.map(
                (vehicle) => (
                  console.log(vehicle),
                  (
                    <motion.div
                      key={vehicle.id}
                      layoutId={`vehicle-${vehicle.id}`}
                      onClick={() => handleSwitchVehicle(vehicle.id)}
                      className={`
                    relative p-3 rounded-2xl border cursor-pointer transition-all duration-200 group
                    flex-shrink-0 min-w-[160px] w-[160px] lg:w-[48%] lg:flex-1 lg:min-w-[140px]
                    h-24 flex flex-col justify-between
                    ${
                      vehicle.is_active
                        ? "bg-[var(--accent)] text-white border-[var(--accent)] shadow-lg shadow-[var(--accent)]/20"
                        : "bg-[var(--background)] hover:bg-[var(--white)] border-[var(--border)] hover:border-[var(--accent)]/50"
                    }
                  `}
                    >
                      <div className="flex justify-between items-start">
                        <Car
                          size={20}
                          className={
                            vehicle.is_active
                              ? "text-white/80"
                              : "text-[var(--text-muted)] group-hover:text-[var(--accent)]"
                          }
                        />
                        {vehicle.is_active && (
                          <CheckCircle2 size={16} className="text-white" />
                        )}
                      </div>
                      <div>
                        <p
                          className={`text-sm font-bold truncate ${
                            vehicle.is_active
                              ? "text-white"
                              : "text-[var(--foreground)]"
                          }`}
                        >
                          {vehicle.nickname || vehicle.model_name || "Vehicle"}
                        </p>
                        <p
                          className={`text-xs truncate ${
                            vehicle.is_active
                              ? "text-white/60"
                              : "text-[var(--text-muted)]"
                          }`}
                        >
                          {vehicle.submodel || vehicle.year} {vehicle.make_name}
                        </p>
                      </div>
                    </motion.div>
                  )
                )
              )
            ) : (
              <div className="w-full py-8 text-center text-[var(--text-muted)] text-sm">
                No vehicles in garage.
              </div>
            )}
          </div>
        </div>

        {/* PART 4: ADD VEHICLE BUTTON */}
        <div className="order-4 col-span-1 h-24 lg:flex-1">
          <button
            onClick={() => setIsAddingCar(true)}
            className="w-full h-full border border-dashed border-[var(--border)] rounded-3xl p-4 bg-[var(--surface)] hover:bg-[var(--surface-hover)] hover:border-[var(--accent)] text-[var(--text-muted)] hover:text-[var(--accent)] transition-all flex flex-col items-center justify-center gap-2 group"
          >
            <div className="p-2 rounded-full bg-[var(--background)] group-hover:bg-[var(--accent)]/10 transition-colors">
              <Plus size={24} />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider">
              Add Vehicle
            </span>
          </button>
        </div>
      </div>

      {/* === MODAL: ADD VEHICLE === */}
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

            <div className="relative">
              <VehicleSelector
                variant="modal"
                onConfirm={handleConfirmAddVehicle}
              />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
