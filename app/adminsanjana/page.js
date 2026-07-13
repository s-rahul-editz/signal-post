import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "../../lib/auth-check";
import LogoutButton from "./LogoutButton";

export default function AdminDashboard() {
  if (!isAdminAuthenticated()) {
    redirect("/adminsanjana/login");
  }

  return (
    <div className="container" style={{ paddingTop: 40 }}>
      <div className="eyebrow">Admin</div>
      <h1 style={{ fontSize: 28, margin: "8px 0 24px" }}>Welcome back.</h1>
      <p style={{ color: "var(--ink-soft)", maxWidth: 480 }}>
        You're in. Post management (create, edit, publish) is next.
      </p>
      <LogoutButton />
    </div>
  );
}
