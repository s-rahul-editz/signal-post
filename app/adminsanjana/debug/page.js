import { createClient } from "../../../lib/supabase-server";
import { cookies } from "next/headers";

export default async function DebugPage() {
  const cookieStore = cookies();
  const allCookies = cookieStore.getAll();

  const supabase = createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  return (
    <div className="container" style={{ paddingTop: 40, fontFamily: "monospace", fontSize: 13 }}>
      <h1 style={{ fontFamily: "monospace" }}>Debug info</h1>

      <h3>Cookies present ({allCookies.length}):</h3>
      <pre style={{ whiteSpace: "pre-wrap", background: "#fff", padding: 10 }}>
{allCookies.map(c => c.name).join("\n") || "NONE — no cookies found at all"}
      </pre>

      <h3>getUser() result:</h3>
      <pre style={{ whiteSpace: "pre-wrap", background: "#fff", padding: 10 }}>
{user ? `User found: ${user.email} (id: ${user.id})` : "No user returned"}
      </pre>

      <h3>getUser() error:</h3>
      <pre style={{ whiteSpace: "pre-wrap", background: "#fff", padding: 10 }}>
{error ? JSON.stringify(error, null, 2) : "none"}
      </pre>
    </div>
  );
}
