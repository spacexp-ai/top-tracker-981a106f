import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [{ title: "Reset password — Top Trackers" }] }),
  component: ResetPassword,
});

function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) return setMsg(error.message);
    setMsg("Password updated. Redirecting…");
    setTimeout(() => navigate({ to: "/portal" }), 1200);
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a] text-[#f5f5f0] px-4">
      <form onSubmit={submit} className="w-full max-w-md bg-[#2d2d2d] border border-[#3d3d3d] p-8">
        <h1 className="font-display text-2xl">Set a new password</h1>
        <input
          type="password"
          required
          minLength={12}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-6 w-full bg-[#1a1a1a] border border-[#3d3d3d] px-4 py-3 focus:outline-none focus:border-[#c9a84c]"
          placeholder="New password"
        />
        {msg && <p className="mt-3 text-xs text-[#c9a84c]">{msg}</p>}
        <button className="mt-4 w-full bg-[#c9a84c] text-[#1a1a1a] py-3 tracking-[0.3em] text-[11px] uppercase">
          Update
        </button>
      </form>
    </div>
  );
}
