// app/settings/_components/ProfileForm.tsx
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Save, Mail, Phone, Loader2 } from "lucide-react";
import { toast } from "sonner"; // Assuming you have a toast library
import { useAuthStore } from "@/app/store/useAuthStore";

// 1. Define the Shape of your data & Validation rules
const profileSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 chars"),
  lastName: z.string().min(2, "Last name must be at least 2 chars"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is too short"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfileForm({ data: _unusedData }: { data?: any }) {
  const { user } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 2. Initialize Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });

  // Update form when user data is available
  useEffect(() => {
    if (user) {
      reset({
        firstName: user.first_name || "",
        lastName: user.last_name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user, reset]);

  // 3. Handle Submission
  const onSubmit = async (values: ProfileFormValues) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Saving:", values);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInitials = () => {
    if (!user?.first_name) return "U";
    return user.first_name[0].toUpperCase();
  };

  if (!user) {
    return (
      <div className="p-8 flex items-center justify-center text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 lg:p-8 space-y-8">
      {/* Header Section */}
      <div className="flex items-center gap-6 pb-6 border-b border-gray-100">
        <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center text-3xl font-bold text-gray-600">
          {getInitials()}
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            {user.first_name} {user.last_name}
          </h3>
          <p className="text-sm text-gray-500">Garage Boss</p>
        </div>
      </div>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* First Name */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">
            First Name
          </label>
          <input
            {...register("firstName")}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs ml-1">
              {errors.firstName.message}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">
            Last Name
          </label>
          <input
            {...register("lastName")}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs ml-1">
              {errors.lastName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2 md:col-span-2">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">
            Email Address
          </label>
          <div className="relative">
            <input
              {...register("email")}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              readOnly // Email usually cannot be changed easily
            />
            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs ml-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2 md:col-span-2">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">
            Phone Number
          </label>
          <div className="relative">
            <input
              {...register("phone")}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
            <Phone
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-xs ml-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSubmitting || !isDirty} // Disable if no changes or loading
            className="flex items-center gap-2 bg-black text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Save size={18} />
            )}
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
