"use client";

import { useState } from "react";
import { Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface PhoneVerificationProps {
  onVerified: (phone: string) => void;
}

export default function PhoneVerification({
  onVerified,
}: PhoneVerificationProps) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // 1. Send OTP (Mock)
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length !== 10) {
      toast.error("Please enter a valid 10-digit number");
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsOtpSent(true);
      setLoading(false);
      toast.success(`OTP sent to ${phone}`);
    }, 1500);
  };

  // 2. Verify OTP (Mock)
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      if (otp === "123456") {
        // Mock success OTP
        onVerified(phone);
        toast.success("Phone verified successfully!");
      } else {
        toast.error("Invalid OTP. Try 123456");
      }
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">Login / Sign up</h3>
        <p className="text-sm text-gray-500">
          Enter your mobile number to checkout
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!isOtpSent ? (
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onSubmit={handleSendOtp}
            className="space-y-4"
          >
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium border-r pr-2">
                +91
              </span>
              <input
                type="tel"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                }
                className="w-full pl-14 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-lg tracking-wide"
                placeholder="Mobile Number"
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={loading || phone.length < 10}
              className="w-full bg-black text-white py-3 rounded-xl font-medium hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  Continue
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </>
              )}
            </button>
          </motion.form>
        ) : (
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onSubmit={handleVerifyOtp}
            className="space-y-4"
          >
            <div className="text-center mb-4">
              <span className="bg-gray-100 text-xs py-1 px-3 rounded-full text-gray-600">
                OTP sent to +91 {phone}
              </span>
              <button
                type="button"
                onClick={() => setIsOtpSent(false)}
                className="text-xs text-blue-600 ml-2 font-medium hover:underline"
              >
                Change?
              </button>
            </div>

            <input
              type="text"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              className="w-full text-center py-3 border rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-2xl tracking-[0.5em] font-mono"
              placeholder="••••••"
              autoFocus
            />

            <button
              type="submit"
              disabled={loading || otp.length < 6}
              className="w-full bg-black text-white py-3 rounded-xl font-medium hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Verify OTP"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
