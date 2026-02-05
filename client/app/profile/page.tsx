// =============================================================================
// PROFILE DASHBOARD - RSC Main Page
// Clean, unified design with no duplicate sections
// =============================================================================

import {
  getProfileDashboardData,
  getProfileData,
} from "../lib/profileServerUtils";
import ProfileStoreInitializer from "../components/Profile/ProfileStoreInitializer";
import ProfileHero from "../components/Profile/ProfileHero";
import OrderHistoryPreview from "../components/Profile/OrderHistoryPreview";
import QuickActions from "../components/Profile/QuickActions";
import ActiveVehicleCard from "../components/Profile/ActiveVehicleCard";
import GarageList from "../components/Profile/GarageList";
import AddVehicleSection from "../components/Profile/AddVehicleSelection";

export default async function ProfileDashboard() {
  // Fetch all profile data on the server (parallel)
  const [{ garage }, dashboardData] = await Promise.all([
    getProfileData(),
    getProfileDashboardData(),
  ]);

  const { user, stats, recentOrders } = dashboardData;

  // If no user (shouldn't happen due to AuthGuard), show nothing
  if (!user) {
    return (
      <div className="w-full min-h-[calc(100vh-6rem)] flex items-center justify-center">
        <p className="text-zinc-500">User not found.</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[calc(100vh-6rem)] bg-zinc-50/30 p-4 lg:p-6 rounded-xl">
      {/* Hydrate client-side store with garage data */}
      <ProfileStoreInitializer garage={garage} />

      <div className="max-w-6xl mx-auto space-y-6">
        {/* ====================================================================
            SECTION 1: Profile Hero
            Unified user info + expandable stats bar (no duplicates)
        ==================================================================== */}
        <ProfileHero user={user} stats={stats} />

        {/* ====================================================================
            SECTION 2: Main Content Grid
            Orders preview (left) + Quick Actions (right)
        ==================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
          {/* Recent Orders */}
          <OrderHistoryPreview orders={recentOrders} />

          {/* Quick Actions */}
          <QuickActions />
        </div>

        {/* ====================================================================
            SECTION 3: Vehicle Management
            Active vehicle + Garage list + Add vehicle
        ==================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4">
          {/* Left: Active Vehicle & Garage */}
          <div className="space-y-4">
            <ActiveVehicleCard />
            <GarageList />
          </div>

          {/* Right: Add Vehicle */}
          <AddVehicleSection />
        </div>
      </div>
    </div>
  );
}
