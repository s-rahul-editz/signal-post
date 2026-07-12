import { createClient } from "./supabase-server";
import { redirect } from "next/navigation";

// Call this at the top of any protected admin page. It redirects to login
// if there's no valid session, or no matching profile/role — and returns
// the profile if everything checks out, so the page can use it directly.
export async function requireAuth(allowedRoles = ["admin", "author"]) {
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

  if (!profile || !allowedRoles.includes(profile.role)) {
    redirect("/adminsanjana/login");
  }

  return profile;
}
