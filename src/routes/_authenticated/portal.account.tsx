import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { PortalShell } from "@/components/portal/PortalShell";
import { getDashboard } from "@/lib/portal.functions";
import { supabase } from "@/integrations/supabase/client";
import { User, HeartPulse, ShieldAlert, Target, Ruler, FileText, Tent, Lock, Loader2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/portal/account")({
  head: () => ({ meta: [{ title: "Account — Top Trackers" }] }),
  component: Account,
});

function Account() {
  const fn = useServerFn(getDashboard);
  const { data, refetch } = useQuery({ queryKey: ["dashboard"], queryFn: () => fn() });
  
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [bio, setBio] = useState("");
  
  const [experienceLevel, setExperienceLevel] = useState("");
  const [preferredWeapon, setPreferredWeapon] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");
  
  const [bootSize, setBootSize] = useState("");
  const [apparelSize, setApparelSize] = useState("");
  const [dominantHand, setDominantHand] = useState("");
  
  const [firearmPermitNum, setFirearmPermitNum] = useState("");
  const [passportCountry, setPassportCountry] = useState("");
  const [passportNum, setPassportNum] = useState("");
  
  const [preferredCamp, setPreferredCamp] = useState("");
  const [primaryInterests, setPrimaryInterests] = useState<string[]>([]);

  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [dietary, setDietary] = useState("");
  
  const [isPublic, setIsPublic] = useState(false);

  const [msg, setMsg] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (data?.profile) {
      const p = data.profile;
      setName(p.display_name ?? "");
      setCountry(p.country ?? "");
      setBio(p.bio ?? "");
      setExperienceLevel(p.experience_level ?? "");
      setPreferredWeapon(p.preferred_weapon ?? "");
      setYearsExperience(p.years_experience ? String(p.years_experience) : "");
      setBootSize(p.boot_size ?? "");
      setApparelSize(p.apparel_size ?? "");
      setDominantHand(p.dominant_hand ?? "");
      setFirearmPermitNum(p.firearm_permit_num ?? "");
      setPassportCountry(p.passport_country ?? "");
      setPassportNum(p.passport_num ?? "");
      setPreferredCamp(p.preferred_camp ?? "");
      setPrimaryInterests(p.primary_interests ?? []);
      setEmergencyName(p.emergency_name ?? "");
      setEmergencyPhone(p.emergency_phone ?? "");
      setDietary(p.dietary ?? "");
      setIsPublic(p.is_public ?? false);
    }
  }, [data?.profile]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setIsSaving(true);
    
    const { error } = await supabase.from("profiles").update({ 
      display_name: name, country, bio, is_public: isPublic,
      experience_level: experienceLevel, preferred_weapon: preferredWeapon,
      years_experience: yearsExperience ? parseInt(yearsExperience) : null,
      boot_size: bootSize, apparel_size: apparelSize, dominant_hand: dominantHand,
      firearm_permit_num: firearmPermitNum, passport_country: passportCountry,
      passport_num: passportNum, preferred_camp: preferredCamp,
      primary_interests: primaryInterests,
      emergency_name: emergencyName, emergency_phone: emergencyPhone, dietary
    }).eq("id", data!.profile!.id);
    
    setIsSaving(false);
    if (error) setMsg(error.message);
    else { 
      setMsg("Profile updated successfully."); 
      refetch(); 
      setTimeout(() => setMsg(null), 3000);
    }
  }

  const toggleInterest = (interest: string) => {
    setPrimaryInterests(prev => 
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const tier = data?.roles?.[0]?.role ?? "observer";

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
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-2">Display name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} maxLength={100}
                  className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] focus:outline-none px-4 py-3 text-sm text-[#f5f5f0] transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-2">Country of Residence</label>
                <input value={country} onChange={(e) => setCountry(e.target.value)} maxLength={80} placeholder="e.g. United States"
                  className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] focus:outline-none px-4 py-3 text-sm text-[#f5f5f0] transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-2">Short Bio</label>
              <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} placeholder="Tell the community about yourself..."
                className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] focus:outline-none px-4 py-3 text-sm text-[#f5f5f0] resize-none transition-colors" />
            </div>
          </div>

          {/* Section: Hunting & Tracking Experience */}
          <div className="bg-[#2d2d2d] border border-[#3d3d3d] p-8">
            <div className="flex items-center gap-3 border-b border-[#3d3d3d] pb-4 mb-6 text-[#c9a84c]">
              <Target className="h-5 w-5" />
              <h2 className="text-[10px] tracking-[0.4em] uppercase">Experience</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-2">Skill Level</label>
                <select value={experienceLevel} onChange={(e) => setExperienceLevel(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] focus:outline-none px-4 py-3 text-sm text-[#f5f5f0] transition-colors appearance-none">
                  <option value="">Select Level</option>
                  <option value="Novice">Novice</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Master Tracker">Master Tracker</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-2">Preferred Weapon</label>
                <select value={preferredWeapon} onChange={(e) => setPreferredWeapon(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] focus:outline-none px-4 py-3 text-sm text-[#f5f5f0] transition-colors appearance-none">
                  <option value="">Select Weapon</option>
                  <option value="Rifle">Rifle</option>
                  <option value="Bow">Bow</option>
                  <option value="Muzzleloader">Muzzleloader</option>
                  <option value="Camera">Camera (Non-lethal)</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-2">Years Active</label>
                <input type="number" value={yearsExperience} onChange={(e) => setYearsExperience(e.target.value)} min="0" placeholder="e.g. 5"
                  className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] focus:outline-none px-4 py-3 text-sm text-[#f5f5f0] transition-colors" />
              </div>
            </div>
          </div>

          {/* Section: Gear & Sizing */}
          <div className="bg-[#2d2d2d] border border-[#3d3d3d] p-8">
            <div className="flex items-center gap-3 border-b border-[#3d3d3d] pb-4 mb-6 text-[#c9a84c]">
              <Ruler className="h-5 w-5" />
              <h2 className="text-[10px] tracking-[0.4em] uppercase">Gear & Sizing</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-2">Boot Size</label>
                <input value={bootSize} onChange={(e) => setBootSize(e.target.value)} placeholder="e.g. US 11 / EU 44"
                  className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] focus:outline-none px-4 py-3 text-sm text-[#f5f5f0] transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-2">Apparel Size</label>
                <select value={apparelSize} onChange={(e) => setApparelSize(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] focus:outline-none px-4 py-3 text-sm text-[#f5f5f0] transition-colors appearance-none">
                  <option value="">Select Size</option>
                  <option value="S">Small (S)</option>
                  <option value="M">Medium (M)</option>
                  <option value="L">Large (L)</option>
                  <option value="XL">X-Large (XL)</option>
                  <option value="XXL">XX-Large (XXL)</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-2">Dominant Hand</label>
                <select value={dominantHand} onChange={(e) => setDominantHand(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] focus:outline-none px-4 py-3 text-sm text-[#f5f5f0] transition-colors appearance-none">
                  <option value="">Select</option>
                  <option value="Right">Right-handed</option>
                  <option value="Left">Left-handed</option>
                  <option value="Ambidextrous">Ambidextrous</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section: Licenses & Documentation */}
          <div className="bg-[#2d2d2d] border border-[#3d3d3d] p-8">
            <div className="flex items-center gap-3 border-b border-[#3d3d3d] pb-4 mb-6 text-[#c9a84c]">
              <FileText className="h-5 w-5" />
              <h2 className="text-[10px] tracking-[0.4em] uppercase">Documentation</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-2">Passport Country</label>
                <input value={passportCountry} onChange={(e) => setPassportCountry(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] focus:outline-none px-4 py-3 text-sm text-[#f5f5f0] transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-2">Passport Number</label>
                <input value={passportNum} onChange={(e) => setPassportNum(e.target.value)} type="password" placeholder="••••••••"
                  className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] focus:outline-none px-4 py-3 text-sm text-[#f5f5f0] transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-2">Firearm Permit #</label>
                <input value={firearmPermitNum} onChange={(e) => setFirearmPermitNum(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] focus:outline-none px-4 py-3 text-sm text-[#f5f5f0] transition-colors" />
              </div>
            </div>
          </div>

          {/* Section: Expedition Preferences */}
          <div className="bg-[#2d2d2d] border border-[#3d3d3d] p-8">
            <div className="flex items-center gap-3 border-b border-[#3d3d3d] pb-4 mb-6 text-[#c9a84c]">
              <Tent className="h-5 w-5" />
              <h2 className="text-[10px] tracking-[0.4em] uppercase">Expedition Preferences</h2>
            </div>
            
            <div className="mb-6">
              <label className="block text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-2">Preferred Camp Style</label>
              <select value={preferredCamp} onChange={(e) => setPreferredCamp(e.target.value)}
                className="w-full max-w-md bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] focus:outline-none px-4 py-3 text-sm text-[#f5f5f0] transition-colors appearance-none">
                <option value="">Select Style</option>
                <option value="Fly-Camp">Fly-Camp (Minimal mobile camp)</option>
                <option value="Classic Canvas">Classic Canvas (Walled tents)</option>
                <option value="Luxury Bush Suite">Luxury Bush Suite (Plumbed, power)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-3">Primary Interests</label>
              <div className="flex flex-wrap gap-3">
                {["Big Game", "Plains Game", "Birding", "Conservation Tracking", "Photography", "Bowhunting"].map(interest => (
                  <button key={interest} type="button" onClick={() => toggleInterest(interest)}
                    className={`px-4 py-2 text-xs border transition-colors ${
                      primaryInterests.includes(interest) 
                      ? "border-[#c9a84c] bg-[#c9a84c]/10 text-[#c9a84c]" 
                      : "border-[#3d3d3d] bg-[#1a1a1a] text-[#a8a8a0] hover:border-[#c9a84c]/50"
                    }`}>
                    {interest}
                  </button>
                ))}
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

          {/* Section: Community Privacy & Membership */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#2d2d2d] border border-[#3d3d3d] p-8">
              <div className="flex items-center gap-3 border-b border-[#3d3d3d] pb-4 mb-6 text-[#c9a84c]">
                <Lock className="h-5 w-5" />
                <h2 className="text-[10px] tracking-[0.4em] uppercase">Privacy Settings</h2>
              </div>
              
              <label className="flex items-start gap-4 cursor-pointer group">
                <div className="relative mt-0.5">
                  <input type="checkbox" className="sr-only" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />
                  <div className={`w-10 h-5 bg-[#1a1a1a] border transition-colors ${isPublic ? 'border-[#c9a84c]' : 'border-[#3d3d3d]'}`}></div>
                  <div className={`absolute top-1 left-1 w-3 h-3 bg-[#a8a8a0] transition-transform ${isPublic ? 'translate-x-5 bg-[#c9a84c]' : ''}`}></div>
                </div>
                <div>
                  <div className="text-sm text-[#f5f5f0]">Public Profile</div>
                  <p className="text-xs text-[#a8a8a0] mt-1 font-serif italic">
                    If enabled, other members can view your profile on the Community page.
                  </p>
                </div>
              </label>
            </div>

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
                <p className="mt-3 text-xs text-[#a8a8a0]">
                  Your tier determines which concessions and premium features you can access. To upgrade your tier, please contact your Professional Hunter.
                </p>
              </div>
            </div>
          </div>

          {/* Sticky Save Bar */}
          <div className="sticky bottom-4 flex items-center justify-between bg-[#1a1a1a]/95 backdrop-blur-md border border-[#3d3d3d] p-4 shadow-2xl">
            <div className="flex items-center gap-3">
              {msg && <span className="text-[10px] tracking-[0.2em] uppercase text-[#c9a84c] animate-in fade-in">{msg}</span>}
            </div>
            <button type="submit" disabled={isSaving} className="inline-flex items-center gap-2 px-8 py-3 bg-[#c9a84c] text-[#1a1a1a] text-[10px] tracking-[0.3em] uppercase hover:bg-[#b0903c] transition-colors font-semibold disabled:opacity-50">
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Changes"}
            </button>
          </div>

        </form>
      </div>
    </PortalShell>
  );
}
