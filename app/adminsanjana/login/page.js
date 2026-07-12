"use client";

import { useState } from "react";
import { createClient } from "../../../lib/supabase-browser";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError("Incorrect email or password.");
      setLoading(false);
      return;
    }

    // Force a full page reload (not a soft client-side navigation) so the browser
    // is guaranteed to send the freshly-set session cookie on the very next request.
    // Without this, the middleware can sometimes evaluate the redirect before the
    // cookie write has fully landed, bouncing back to login even after a successful sign-in.
    window.location.href = "/adminsanjana";
  }

  return (
    <div className="container" style={{ maxWidth: 380, paddingTop: 80 }}>
      <div className="eyebrow">Restricted access</div>
      <h1 style={{ fontSize: 28, margin: "8px 0 24px" }}>Sign in</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />
        {error && (
          <p style={{ color: "var(--maroon)", fontSize: 14, marginTop: -4 }}>{error}</p>
        )}
        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  display: "block",
  width: "100%",
  padding: "12px 14px",
  marginBottom: 12,
  border: "1.5px solid var(--ink)",
  borderRadius: 4,
  background: "var(--paper-raised)",
  fontFamily: "var(--body)",
  fontSize: 15,
  color: "var(--ink)",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  background: "var(--maroon)",
  color: "var(--paper)",
  border: "none",
  borderRadius: 4,
  fontFamily: "var(--mono)",
  fontWeight: 500,
  fontSize: 14,
  cursor: "pointer",
  marginTop: 4,
};
