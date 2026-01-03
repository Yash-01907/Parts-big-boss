// app/profile/layout.tsx
import ProfileSidebar from "./Sidebar/page";
import AuthGuard from "./AuthGuard";
// Note: transforming motion.div to a standard div for server component
// or we keep the main content wrapper as a client component if animation is needed.
// For pure server component compliance, we should use a client wrapper for the animation or standard CSS.
// However, since the user wants optimization without touching CSS too much,
// and motion is already there, we will use a Client Component wrapper for the content area called PageContentWrapper.

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col md:flex-row bg-[#FDFDFD]">
        {/* SIDEBAR */}
        <ProfileSidebar />

        {/* MAIN CONTENT */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </AuthGuard>
  );
}
