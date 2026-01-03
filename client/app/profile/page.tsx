import { getProfileData } from "../lib/profileServerUtils";
import ProfileStoreInitializer from "../components/Profile/ProfileStoreInitializer";
import ActiveVehicleCard from "../components/Profile/ActiveVehicleCard";
import RecentOrders from "../components/Profile/RecentOrders";
import GarageList from "../components/Profile/GarageList";
import AddVehicleSection from "../components/Profile/AddVehicleSelection";

export default async function ProfileDashboard() {
  // 1. Fetch Data on the Server
  const { garage, orders } = await getProfileData();

  return (
    <div className="w-full min-h-[calc(100vh-6rem)] bg-[var(--background)] p-4 lg:p-6 rounded-xl flex flex-col gap-6">
      <ProfileStoreInitializer garage={garage} />

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        {/* Left Column: Recent Orders */}
        <div className="flex flex-col h-full">
          <RecentOrders orders={orders} />
        </div>

        {/* Right Column: Vehicle & Garage Management */}
        <div className="flex flex-col gap-4">
          <ActiveVehicleCard />
          <GarageList />
        </div>
      </div>

      {/* Bottom Section: Variable Area & Add Vehicle */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Variable Part (Placeholder) */}
        <div className="md:col-span-2 h-24 lg:h-auto border border-dashed border-[var(--border)] rounded-3xl p-6 bg-[var(--surface)] text-[var(--text-muted)] flex items-center justify-center text-sm font-medium tracking-wide uppercase">
          Variable Area
        </div>

        {/* Add Vehicle Button */}
        <div className="md:col-span-1">
          <AddVehicleSection />
        </div>
      </div>
    </div>
  );
}
