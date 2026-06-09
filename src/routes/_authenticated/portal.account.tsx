import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { PortalShell } from "@/components/portal/PortalShell";
import { getDashboard } from "@/lib/portal.functions";
import { supabase } from "@/integrations/supabase/client";
import { User, HeartPulse, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/_authenticated/portal/account")({
  head: () => ({ meta: [{ title: "Account — Top Trackers" }] }),
  component: Account,
});

function Account() {
  const fn = useServerFn(getDashboard);
  const { data, refetch } = useQuery({ queryKey: ["dashboard"], queryFn: () => fn() });
  
  // Profile state
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  
  // Extended state (Mocked for UI until DB migration)
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [dietary, setDietary] = useState("");

  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    if (data?.profile) {
      setName(data.profile.display_name ?? "");
      setCountry(data.profile.country ?? "");
    }
    // Load extended fields from local storage as a fallback for now
    const localMeta = localStorage.getItem("toptrackers_meta");
    if (localMeta) {
      try {
        const parsed = JSON.parse(localMeta);
        setEmergencyName(parsed.emergencyName || "");
        setEmergencyPhone(parsed.emergencyPhone || "");
        setDietary(parsed.dietary || "");
      } catch (e) {}
    }
  }, [data?.profile]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    
    // Save to DB
    const { error } = await supabase.from("profiles").update({ display_name: name, country }).eq("id", data!.profile!.id);
    
    // Save extended to localStorage
    localStorage.setItem("toptrackers_meta", JSON.stringify({ emergencyName, emergencyPhone, dietary }));

    if (error) setMsg(error.message);
    else { setMsg("Profile updated successfully."); refetch(); }
  }

  const tier = data?.roles?.[0]?.role ?? "observer";
  const email = data?.profile?.id ? "user@example.com" : ""; // Auth email usually requires fetching user

  return (
    <PortalShell title="Account Settings">
      <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <form onSubmit={save} className="space-y-8">
          
          {/* Section: Personal Details */}
          <div className="bg-[#2d2d2d] border border-[#3d3d3d] p-8">
            <div className="flex items-center gap-3 border-b border-[#3d3d3d] pb-4 mb-6 text-[#c9a84c]">
              <User className="h-5 w-5" />
              <h2 className="text-[10px] tracking-[0.4em] uppercase">Personal Details</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-2">Display name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} maxLength={100}
                  className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] focus:outline-none px-4 py-3 text-sm text-[#f5f5f0] transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-2">Country of Residence</label>
                <input value={country} onChange={(e) => setCountry(e.target.value)} maxLength={80}
                  className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] focus:outline-none px-4 py-3 text-sm text-[#f5f5f0] transition-colors" />
              </div>
            </div>
          </div>

          {/* Section: Health & Safety */}
          <div className="bg-[#2d2d2d] border border-[#3d3d3d] p-8">
            <div className="flex items-center gap-3 border-b border-[#3d3d3d] pb-4 mb-6 text-[#c9a84c]">
              <ShieldAlert className="h-5 w-5" />
              <h2 className="text-[10px] tracking-[0.4em] uppercase">Health & Safety</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-2">Emergency Contact Name</label>
                <input value={emergencyName} onChange={(e) => setEmergencyName(e.target.value)} maxLength={100} placeholder="e.g. Jane Doe"
                  className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] focus:outline-none px-4 py-3 text-sm text-[#f5f5f0] transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-2">Emergency Contact Phone</label>
                <input value={emergencyPhone} onChange={(e) => setEmergencyPhone(e.target.value)} maxLength={80} placeholder="+1 (555) 000-0000"
                  className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] focus:outline-none px-4 py-3 text-sm text-[#f5f5f0] transition-colors" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-2">Dietary Requirements / Medical Info</label>
              <textarea value={dietary} onChange={(e) => setDietary(e.target.value)} rows={3} placeholder="Please list any allergies or dietary requirements for camp preparation..."
                className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] focus:outline-none px-4 py-3 text-sm text-[#f5f5f0] resize-none transition-colors" />
            </div>
          </div>

          {/* Section: Membership */}
          <div className="bg-[#2d2d2d] border border-[#3d3d3d] p-8">
            <div className="flex items-center gap-3 border-b border-[#3d3d3d] pb-4 mb-6 text-[#c9a84c]">
              <HeartPulse className="h-5 w-5" />
              <h2 className="text-[10px] tracking-[0.4em] uppercase">Membership & Tier</h2>
            </div>
            
            <div>
              <label className="block text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-2">Current Tier</label>
              <div className="inline-block px-4 py-2 bg-[#1a1a1a] border border-[#3d3d3d] text-[#c9a84c] font-mono text-xs uppercase tracking-[0.2em]">
                {tier}
              </div>
              <p className="mt-3 text-xs text-[#a8a8a0] max-w-xl">
                Your tier determines which concessions and premium features you can access. To upgrade your tier, please contact your Professional Hunter.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 border-t border-[#3d3d3d] pt-6">
            <button type="submit" className="px-8 py-3 bg-[#c9a84c] text-[#1a1a1a] text-[10px] tracking-[0.3em] uppercase hover:bg-[#b0903c] transition-colors font-semibold">
              Save Changes
            </button>
            {msg && <span className="text-xs text-[#c9a84c] animate-in fade-in">{msg}</span>}
          </div>

        </form>
      </div>
    </PortalShell>
  );
}
