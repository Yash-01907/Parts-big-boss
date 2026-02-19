"use client";

import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

interface AddressFormProps {
  onSubmit: (data: AddressData) => void;
  defaultValues?: Partial<AddressData>;
  isLoading?: boolean;
}

export interface AddressData {
  fullName: string;
  phone: string;
  pincode: string;
  state: string;
  city: string;
  addressLine1: string;
  addressLine2?: string;
  type: "Home" | "Work";
}

export default function AddressForm({
  onSubmit,
  defaultValues,
  isLoading,
}: AddressFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressData>({
    defaultValues: {
      type: "Home",
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            {...register("fullName", { required: "Name is required" })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
            placeholder="John Doe"
          />
          {errors.fullName && (
            <span className="text-xs text-red-500 mt-1">
              {errors.fullName.message}
            </span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Enter valid 10-digit number",
              },
            })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
            placeholder="9876543210"
            type="tel"
          />
          {errors.phone && (
            <span className="text-xs text-red-500 mt-1">
              {errors.phone.message}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pincode
          </label>
          <input
            {...register("pincode", {
              required: "Pincode is required",
              pattern: {
                value: /^[0-9]{6}$/,
                message: "Enter valid 6-digit pincode",
              },
            })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
            placeholder="110001"
          />
          {errors.pincode && (
            <span className="text-xs text-red-500 mt-1">
              {errors.pincode.message}
            </span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            {...register("city", { required: "City is required" })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
            placeholder="New Delhi"
          />
          {errors.city && (
            <span className="text-xs text-red-500 mt-1">
              {errors.city.message}
            </span>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          State
        </label>
        <input
          {...register("state", { required: "State is required" })}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
          placeholder="Delhi"
        />
        {errors.state && (
          <span className="text-xs text-red-500 mt-1">
            {errors.state.message}
          </span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Address (House No, Building, Street)
        </label>
        <textarea
          {...register("addressLine1", { required: "Address is required" })}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all min-h-[80px]"
          placeholder="Flat 101, Galaxy Apartments, MG Road"
        />
        {errors.addressLine1 && (
          <span className="text-xs text-red-500 mt-1">
            {errors.addressLine1.message}
          </span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Address Type
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="Home"
              {...register("type")}
              className="accent-black w-4 h-4"
            />
            <span className="text-sm">Home</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="Work"
              {...register("type")}
              className="accent-black w-4 h-4"
            />
            <span className="text-sm">Work</span>
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Saving...
          </>
        ) : (
          "Save & Deliver Here"
        )}
      </button>
    </form>
  );
}
