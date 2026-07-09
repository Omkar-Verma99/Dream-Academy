import { requireStaffSession } from "@/lib/auth/staff";
import { PortalNav } from "@/components/portal/PortalNav";

export default async function StaffPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireStaffSession();

  return (
    <div className="min-h-screen bg-surface">
      <PortalNav email={session.email} />
      <main>{children}</main>
    </div>
  );
}
