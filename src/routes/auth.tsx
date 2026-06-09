import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "The Camp Gate — Top Trackers" },
      { name: "description", content: "Sign in to your Top Trackers member portal." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/portal" });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      if (s) navigate({ to: "/portal" });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin + "/portal",
            data: { display_name: name || email.split("@")[0] },
          },
        });
        if (error) throw error;
        setError("Check your email to confirm your account, then sign in.");
        setMode("signin");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed");
    } finally {
      setLoading(false);
    }
  }

  async function google() {
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/portal"
      }
    });
    if (error) setError(error.message);
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#1a1a1a] text-[#f5f5f0]">
      {/* topographic backdrop */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="topo" width="120" height="120" patternUnits="userSpaceOnUse">
            <path d="M0 60 Q30 30 60 60 T120 60" stroke="#c9a84c" strokeWidth="0.8" fill="none" />
            <path d="M0 90 Q30 60 60 90 T120 90" stroke="#c9a84c" strokeWidth="0.6" fill="none" />
            <path d="M0 30 Q30 0 60 30 T120 30" stroke="#c9a84c" strokeWidth="0.5" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#topo)" />
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(201,168,76,0.12),transparent_60%)]" />

      <div className="relative min-h-screen flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <Link to="/" className="block text-center mb-8 text-[10px] tracking-[0.4em] uppercase text-[#c9a84c] hover:text-white">
            ◆ Top Trackers
          </Link>
          <div className="bg-[#2d2d2d] border border-[#3d3d3d] p-8 md:p-10 shadow-2xl">
            <h1 className="font-display text-3xl text-[#f5f5f0]">Welcome, Tracker</h1>
            <p className="mt-2 text-sm text-[#a8a8a0]">
              {mode === "signin" ? "Enter the camp." : "Request your seat by the fire."}
            </p>

            <form onSubmit={submit} className="mt-6 space-y-4">
              {mode === "signup" && (
                <Field label="Display name" value={name} onChange={setName} placeholder="J. Hemingway" />
              )}
              <Field label="Email" type="email" value={email} onChange={setEmail} required placeholder="you@email.com" />
              <Field label="Password" type="password" value={password} onChange={setPassword} required placeholder="••••••••••••" />

              {error && <p className="text-xs text-[#e8a87c]">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#c9a84c] hover:bg-[#d4b95c] text-[#1a1a1a] tracking-[0.3em] text-[11px] uppercase font-semibold py-3.5 transition disabled:opacity-60"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : (mode === "signin" ? "Enter the camp" : "Request access")}
              </button>
            </form>

            <div className="my-6 flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0]">
              <span className="h-px flex-1 bg-[#3d3d3d]" /> or <span className="h-px flex-1 bg-[#3d3d3d]" />
            </div>

            <button
              onClick={google}
              className="w-full inline-flex items-center justify-center gap-3 bg-[#1a1a1a] border border-[#3d3d3d] hover:border-[#c9a84c] text-[#f5f5f0] text-xs tracking-[0.2em] uppercase py-3 transition"
            >
              <GoogleGlyph /> Continue with Google
            </button>

            <div className="mt-6 flex items-center justify-between text-[11px] text-[#a8a8a0]">
              <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="hover:text-[#c9a84c]">
                {mode === "signin" ? "Request Observer Pass" : "Have an account? Sign in"}
              </button>
              <Link to="/membership-apply" className="hover:text-[#c9a84c]">Apply for membership</Link>
            </div>
          </div>
          <p className="mt-6 text-center text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0]">
            Iringa Concession · Tanzania
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({
  label, value, onChange, type = "text", required, placeholder,
}: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label className="block text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-2">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={200}
        className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] focus:outline-none focus:ring-1 focus:ring-[#c9a84c]/50 text-[#f5f5f0] px-4 py-3 text-sm font-mono tracking-tight"
      />
    </div>
  );
}

function GoogleGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z"/><path fill="#FBBC05" d="M5.84 14.1A6.99 6.99 0 0 1 5.46 12c0-.73.13-1.44.36-2.1V7.07H2.18A11 11 0 0 0 1 12c0 1.78.42 3.45 1.18 4.93l3.66-2.84Z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.65l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z"/></svg>
  );
}
