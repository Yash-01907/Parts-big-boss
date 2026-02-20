"use client";

import { useAuthStore } from "../../store/useAuthStore";
import PhoneVerification from "./PhoneVerification";
import AddressForm, { AddressData } from "./AddressForm";
import { Address } from "../../types/address";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Plus, MapPin } from "lucide-react";

interface CheckoutSectionProps {
  step: "auth" | "address" | "payment";
  isGuestVerified: boolean;
  onGuestVerified: (phone: string) => void;
  addresses: Address[];
  selectedAddressId: string | null;
  onSelectAddress: (id: string) => void;
  showAddAddress: boolean;
  setShowAddAddress: (show: boolean) => void;
  onAddressSubmit: (data: AddressData) => void;
}

export default function CheckoutSection({
  step,
  isGuestVerified,
  onGuestVerified,
  addresses,
  selectedAddressId,
  onSelectAddress,
  showAddAddress,
  setShowAddAddress,
  onAddressSubmit,
}: CheckoutSectionProps) {
  const { isAuthenticated } = useAuthStore();

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <MapPin className="text-[var(--accent)]" />
        Delivery Details
      </h2>

      <div className="flex flex-col gap-4">
        {/* Mobile Flow (Animated) */}
        <div className="md:hidden overflow-hidden relative min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {step === "auth" && !isAuthenticated && !isGuestVerified && (
              <motion.div
                key="auth"
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <PhoneVerification onVerified={onGuestVerified} />
              </motion.div>
            )}

            {step === "address" && (
              <motion.div
                key="address"
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="pb-20">
                  <AddressContent
                    addresses={addresses}
                    selectedAddressId={selectedAddressId}
                    setSelectedAddressId={onSelectAddress}
                    showAddAddress={showAddAddress}
                    setShowAddAddress={setShowAddAddress}
                    handleAddressSubmit={onAddressSubmit}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop Flow (Simple Vertical) */}
        <div className="hidden md:block">
          {!isAuthenticated && !isGuestVerified ? (
            <PhoneVerification onVerified={onGuestVerified} />
          ) : (
            <AddressContent
              addresses={addresses}
              selectedAddressId={selectedAddressId}
              setSelectedAddressId={onSelectAddress}
              showAddAddress={showAddAddress}
              setShowAddAddress={setShowAddAddress}
              handleAddressSubmit={onAddressSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// Sub-component for Address List/Form to be reused in Mobile/Desktop views
function AddressContent({
  addresses,
  selectedAddressId,
  setSelectedAddressId,
  showAddAddress,
  setShowAddAddress,
  handleAddressSubmit,
}: {
  addresses: Address[];
  selectedAddressId: string | null;
  setSelectedAddressId: (id: string) => void;
  showAddAddress: boolean;
  setShowAddAddress: (show: boolean) => void;
  handleAddressSubmit: (data: AddressData) => void;
}) {
  return (
    <div className="space-y-6">
      {/* Saved Addresses List */}
      {!showAddAddress && addresses.length > 0 && (
        <div className="grid gap-4">
          {addresses.map((addr, idx) => (
            <div
              key={`${addr.id ?? "addr"}-${idx}`}
              onClick={() => setSelectedAddressId(addr.id!)}
              className={`
                relative p-4 rounded-xl border-2 cursor-pointer transition-all
                ${
                  selectedAddressId === addr.id
                    ? "border-black bg-white shadow-md"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }
              `}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900">
                      {addr.fullName}
                    </span>
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600 font-medium">
                      {addr.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    {addr.streetAddress}
                  </p>
                  <p className="text-sm text-gray-600">
                    {addr.city}, {addr.state} - {addr.zipCode}
                  </p>
                  <p className="text-sm text-gray-600 mt-1 font-medium">
                    Phone: {addr.phone}
                  </p>
                </div>
                {selectedAddressId === addr.id && (
                  <div className="bg-black text-white p-1 rounded-full">
                    <Check size={12} />
                  </div>
                )}
              </div>
            </div>
          ))}

          <button
            onClick={() => setShowAddAddress(true)}
            className="flex items-center justify-center gap-2 w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-medium hover:border-gray-400 hover:text-gray-600 transition-all hover:bg-gray-50"
          >
            <Plus size={20} />
            Add New Address
          </button>
        </div>
      )}

      {/* Add New Address Form */}
      {(showAddAddress || addresses.length === 0) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Add New Address</h3>
            {addresses.length > 0 && (
              <button
                onClick={() => setShowAddAddress(false)}
                className="text-sm text-gray-500 hover:text-black underline"
              >
                Cancel
              </button>
            )}
          </div>
          <AddressForm onSubmit={handleAddressSubmit} />
        </motion.div>
      )}
    </div>
  );
}
