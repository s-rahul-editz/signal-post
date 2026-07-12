import { requireAuth } from "../../lib/requireAuth";
import LogoutButton from "./LogoutButton";

export default async function AdminDashboard() {
  const profile = await requireAuth();

  return (
    <div className="container" style={{ paddingTop: 40 }}>
      <div className="eyebrow">{profile.role}</div>
      <h1 style={{ fontSize: 28, margin: "8px 0 24px" }}>
        Welcome, {profile.display_name}.
      </h1>
      <p style={{ color: "var(--ink-soft)", maxWidth: 480 }}>
        The login gate is working — this page only renders for a signed-in account
        with a valid profile. Post management (create, edit, publish) is the next
        thing we build here.
      </p>
      <LogoutButton />
    </div>
  );
          }
