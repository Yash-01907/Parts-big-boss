"use client";

import { useState } from "react";
import {
  Plus,
  MapPin,
  Pencil,
  Trash2,
  CheckCircle2,
  MoreVertical,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

// --- Types & Schema ---

const addressSchema = z.object({
  id: z.string().optional(),
  label: z.string().min(2, "Label is required (e.g. Home, Work)"),
  fullName: z.string().min(2, "Full name is required"),
  phone: z.string().min(10, "Phone number is required"),
  streetAddress: z.string().min(5, "Street address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().min(4, "ZIP code is required"),
  country: z.string().min(2, "Country is required"),
  isDefault: z.boolean().optional(),
});

type AddressFormValues = z.infer<typeof addressSchema>;

// Mock Initial Data
const INITIAL_ADDRESSES: AddressFormValues[] = [
  {
    id: "1",
    label: "Home",
    fullName: "John Doe",
    phone: "+1 234 567 890",
    streetAddress: "123 Main St, Apt 4B",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "USA",
    isDefault: true,
  },
  {
    id: "2",
    label: "Work",
    fullName: "John Doe",
    phone: "+1 234 567 890",
    streetAddress: "456 Corporate Blvd",
    city: "New York",
    state: "NY",
    zipCode: "10022",
    country: "USA",
    isDefault: false,
  },
];

export default function AddressManager() {
  const [addresses, setAddresses] =
    useState<AddressFormValues[]>(INITIAL_ADDRESSES);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Toggle Add/Edit Mode
  const handleAddNew = () => {
    setEditingId(null);
    setIsAdding(true);
  };

  const handleEdit = (address: AddressFormValues) => {
    setEditingId(address.id || null);
    setIsAdding(true);
  };

  // Delete Address
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this address?")) {
      setAddresses((prev) => prev.filter((addr) => addr.id !== id));
      toast.success("Address deleted");
    }
  };

  // Set Default
  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
    toast.success("Default address updated");
  };

  // Save (Add/Update)
  const handleSave = (data: AddressFormValues) => {
    if (editingId) {
      // Update
      setAddresses((prev) =>
        prev.map((addr) =>
          addr.id === editingId ? { ...data, id: editingId } : addr
        )
      );
      toast.success("Address updated successfully");
    } else {
      // Add
      const newAddress = {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
      };
      // If it's the first address, make it default
      if (addresses.length === 0) newAddress.isDefault = true;

      setAddresses((prev) => [...prev, newAddress]);
      toast.success("Address added successfully");
    }
    setIsAdding(false);
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Saved Addresses</h2>
          <p className="text-sm text-gray-500">
            Manage your shipping and billing locations
          </p>
        </div>
        {!isAdding && (
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl font-medium shadow-lg hover:bg-gray-800 transition-all text-sm"
          >
            <Plus size={18} />
            Add New Address
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {isAdding ? (
          <AddressForm
            initialData={addresses.find((a) => a.id === editingId)}
            onSave={handleSave}
            onCancel={() => {
              setIsAdding(false);
              setEditingId(null);
            }}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-4"
          >
            {addresses.map((addr) => (
              <AddressCard
                key={addr.id}
                address={addr}
                onEdit={() => handleEdit(addr)}
                onDelete={() => handleDelete(addr.id!)}
                onSetDefault={() => handleSetDefault(addr.id!)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Sub-components ---

function AddressCard({
  address,
  onEdit,
  onDelete,
  onSetDefault,
}: {
  address: AddressFormValues;
  onEdit: () => void;
  onDelete: () => void;
  onSetDefault: () => void;
}) {
  return (
    <div className="group relative bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-all duration-300">
      {/* Default Badge */}
      {address.isDefault && (
        <span className="absolute top-5 right-5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold uppercase tracking-wide">
          <CheckCircle2 size={12} /> Default
        </span>
      )}

      {/* Content */}
      <div className="space-y-3 pr-20">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 text-gray-600">
            <MapPin size={14} />
          </span>
          <span className="font-bold text-gray-900">{address.label}</span>
        </div>

        <div className="space-y-1 text-sm text-gray-600 pl-10">
          <p className="font-medium text-gray-900">{address.fullName}</p>
          <p>{address.streetAddress}</p>
          <p>
            {address.city}, {address.state} {address.zipCode}
          </p>
          <p>{address.country}</p>
          <p className="text-gray-400 text-xs pt-1">{address.phone}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 mt-6 pl-10">
        <button
          onClick={onEdit}
          className="text-xs font-medium text-gray-600 hover:text-black hover:underline underline-offset-4"
        >
          Edit
        </button>
        <div className="w-px h-3 bg-gray-200"></div>
        <button
          onClick={onDelete}
          className="text-xs font-medium text-red-500 hover:text-red-700 hover:underline underline-offset-4"
        >
          Remove
        </button>
        {!address.isDefault && (
          <>
            <div className="w-px h-3 bg-gray-200"></div>
            <button
              onClick={onSetDefault}
              className="text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline underline-offset-4"
            >
              Set as Default
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function AddressForm({
  initialData,
  onSave,
  onCancel,
}: {
  initialData?: AddressFormValues;
  onSave: (data: AddressFormValues) => void;
  onCancel: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: initialData || {
      label: "",
      fullName: "",
      phone: "",
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
      isDefault: false,
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 lg:p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">
          {initialData ? "Edit Address" : "Add New Address"}
        </h3>
        <button
          onClick={onCancel}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={20} className="text-gray-500" />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSave)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Label */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">
              Label
            </label>
            <input
              {...register("label")}
              placeholder="e.g. Home, Work"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all"
            />
            {errors.label && (
              <p className="text-red-500 text-xs ml-1">
                {errors.label.message}
              </p>
            )}
          </div>

          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">
              Full Name
            </label>
            <input
              {...register("fullName")}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all"
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs ml-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">
              Phone Number
            </label>
            <input
              {...register("phone")}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs ml-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Street Address */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">
              Street Address
            </label>
            <input
              {...register("streetAddress")}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all"
            />
            {errors.streetAddress && (
              <p className="text-red-500 text-xs ml-1">
                {errors.streetAddress.message}
              </p>
            )}
          </div>

          {/* City */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">
              City
            </label>
            <input
              {...register("city")}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all"
            />
            {errors.city && (
              <p className="text-red-500 text-xs ml-1">{errors.city.message}</p>
            )}
          </div>

          {/* State */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">
              State / Province
            </label>
            <input
              {...register("state")}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all"
            />
            {errors.state && (
              <p className="text-red-500 text-xs ml-1">
                {errors.state.message}
              </p>
            )}
          </div>

          {/* ZIP Code */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">
              ZIP / Postal Code
            </label>
            <input
              {...register("zipCode")}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all"
            />
            {errors.zipCode && (
              <p className="text-red-500 text-xs ml-1">
                {errors.zipCode.message}
              </p>
            )}
          </div>

          {/* Country */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">
              Country
            </label>
            <input
              {...register("country")}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all"
            />
            {errors.country && (
              <p className="text-red-500 text-xs ml-1">
                {errors.country.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-6 border-t border-gray-50">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 rounded-xl font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-black text-white px-8 py-2.5 rounded-xl font-semibold shadow-lg hover:bg-gray-800 transition-all"
          >
            Save Address
          </button>
        </div>
      </form>
    </motion.div>
  );
}
