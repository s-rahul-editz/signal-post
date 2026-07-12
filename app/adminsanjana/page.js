import { createClient } from "../../lib/supabase-server";
import { redirect } from "next/navigation";
import LogoutButton from "./LogoutButton";

export default async function AdminDashboard() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/adminsanjana/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name, role")
    .eq("id", user.id)
    .single();

  if (!profile || (profile.role !== "admin" && profile.role !== "author")) {
    redirect("/adminsanjana/login");
  }

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
