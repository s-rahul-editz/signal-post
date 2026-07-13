"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "./supabase-browser";

export function useAdminAuth(allowedRoles = ["admin", "author"]) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let active = true;

    async function checkAuth() {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/adminsanjana/login");
        return;
      }

      const { data: profileData } = await supabase
        .from("profiles")
        .select("display_name, role")
        .eq("id", session.user.id)
        .single();

      if (!profileData || !allowedRoles.includes(profileData.role)) {
        router.replace("/adminsanjana/login");
        return;
      }

      if (active) {
        setProfile(profileData);
        setLoading(false);
      }
    }

    checkAuth();
    return () => {
      active = false;
    };
  }, [router]);

  return { profile, loading };
}
