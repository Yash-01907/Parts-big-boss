"use client";

import { useState } from "react";
import { Bell, Mail, Smartphone, Info } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

// --- Types ---
type NotificationItem = {
  id: string;
  label: string;
  description: string;
  email: boolean;
  sms: boolean;
  push: boolean;
};

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "orders",
    label: "Order Updates",
    description:
      "Get notified about order confirmation, shipping, and delivery.",
    email: true,
    sms: true,
    push: true,
  },
  {
    id: "promotions",
    label: "Promotions & Offers",
    description: "Receive exclusive offers, coupons, and seasonal deals.",
    email: true,
    sms: false,
    push: false,
  },
  {
    id: "security",
    label: "Account Security",
    description: "Alerts for new logins and password changes.",
    email: true,
    sms: true,
    push: true,
  },
  {
    id: "newsletter",
    label: "Car Boss Newsletter",
    description: "Weekly digest of the hottest car parts and trends.",
    email: false,
    sms: false,
    push: false,
  },
];

export default function NotificationSettings() {
  const [preferences, setPreferences] = useState<NotificationItem[]>(
    INITIAL_NOTIFICATIONS
  );
  const [hasChanges, setHasChanges] = useState(false);

  const handleToggle = (id: string, channel: "email" | "sms" | "push") => {
    setPreferences((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [channel]: !item[channel] } : item
      )
    );
    setHasChanges(true);
  };

  const handleSave = () => {
    // Simulate API save
    console.log("Saving preferences:", preferences);
    toast.success("Notification preferences saved");
    setHasChanges(false);
  };

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
        <div className="h-12 w-12 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600">
          <Bell size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Notifications</h3>
          <p className="text-sm text-gray-500">
            Choose how and when you want to be notified
          </p>
        </div>
      </div>

      {/* Preferences List */}
      <div className="space-y-8">
        {preferences.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-4 pb-6 border-b border-gray-50 last:border-0 last:pb-0"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h4 className="font-semibold text-gray-900">{item.label}</h4>
                <p className="text-sm text-gray-500 max-w-md">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 md:gap-8">
              {/* Email Switch */}
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={item.email}
                    onChange={() => handleToggle(item.id, "email")}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 group-hover:text-black transition-colors">
                  <Mail size={16} />
                  <span>Email</span>
                </div>
              </label>

              {/* SMS Switch */}
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={item.sms}
                    onChange={() => handleToggle(item.id, "sms")}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 group-hover:text-black transition-colors">
                  <Smartphone size={16} />
                  <span>SMS</span>
                </div>
              </label>

              {/* Push Switch */}
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={item.push}
                    onChange={() => handleToggle(item.id, "push")}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 group-hover:text-black transition-colors">
                  <Bell size={16} />
                  <span>Push</span>
                </div>
              </label>
            </div>
          </div>
        ))}
      </div>

      {hasChanges && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-end pt-4 border-t border-gray-100"
        >
          <button
            onClick={handleSave}
            className="bg-black text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-gray-800 transition-all"
          >
            Save Changes
          </button>
        </motion.div>
      )}

      <div className="bg-blue-50 text-blue-800 p-4 rounded-xl flex items-start gap-3">
        <Info className="flex-shrink-0 mt-0.5" size={20} />
        <p className="text-sm leading-relaxed">
          <strong>Note:</strong> Critical security alerts (like password
          changes) cannot be disabled. We promise not to spam you!
        </p>
      </div>
    </div>
  );
}
