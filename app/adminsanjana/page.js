"use client";

import { useAdminAuth } from "../../lib/useAdminAuth";
import LogoutButton from "./LogoutButton";

export default function AdminDashboard() {
  const { profile, loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: 40 }}>
        <p style={{ color: "var(--ink-soft)" }}>Checking access...</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: 40 }}>
      <div className="eyebrow">{profile.role}</div>
      <h1 style={{ fontSize: 28, margin: "8px 0 24px" }}>
        Welcome, {profile.display_name}.
      </h1>
      <p style={{ color: "var(--ink-soft)", maxWidth: 480 }}>
        The login gate is working — this page only renders once the browser confirms
        a valid session and profile. Post management (create, edit, publish) is next.
      </p>
      <LogoutButton />
    </div>
  );
}
