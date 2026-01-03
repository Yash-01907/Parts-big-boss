// app/settings/page.tsx
import { Metadata } from "next";
import SettingsShell from "./SettingsShell";

export const metadata: Metadata = {
  title: "Account Settings",
};

export default function SettingsPage() {
  return (
    <div className="w-full min-h-[calc(100vh-6rem)] bg-[var(--background)] p-4 lg:p-8 rounded-xl flex flex-col gap-8">
      <div className="max-w-6xl w-full mx-auto space-y-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">
            Settings
          </h1>
          <p className="text-[var(--text-muted)]">
            Manage your account preferences and personal details.
          </p>
        </div>

        {/* We pass server data to the client shell */}
        <SettingsShell initialData={null} />
      </div>
    </div>
  );
}
