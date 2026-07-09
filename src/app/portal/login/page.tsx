import { LoginForm } from "@/components/portal/LoginForm";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Staff sign in",
  description: "Sign in to the DREAM Academy staff content portal.",
  path: "/portal/login",
});

export default function PortalLoginPage() {
  return <LoginForm />;
}
