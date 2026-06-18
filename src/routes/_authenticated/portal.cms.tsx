import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState, useEffect } from "react";
import { PortalShell } from "@/components/portal/PortalShell";
import { getDashboard } from "@/lib/portal.functions";
import { useSiteContent, useSaveSiteContent, resolveImage } from "@/hooks/useSiteContent";
import { supabase } from "@/integrations/supabase/client";
import { photos } from "@/assets/photos";
import { 
  Loader2, Save, FileText, Image as ImageIcon, Video, Compass, 
  Quote, HelpCircle, Eye, AlertCircle, UploadCloud
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/portal/cms")({
  head: () => ({ meta: [{ title: "Site CMS — Top Trackers" }] }),
  component: SiteCMS,
});

type TabType = "hero" | "intro" | "pillars" | "experience" | "camp" | "quotes";

function SiteCMS() {
  const fn = useServerFn(getDashboard);
  const { data: dashboardData, isLoading: isDashboardLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => fn(),
  });

  const { data: content, isLoading: isContentLoading } = useSiteContent();
  const saveMutation = useSaveSiteContent();

  const [activeTab, setActiveTab] = useState<TabType>("hero");
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isUploading, setIsUploading] = useState<Record<string, boolean>>({});

  // Populate local form state when database content loads
  useEffect(() => {
    if (content) {
      setFormData(content);
    }
  }, [content]);

  const isAdmin = dashboardData?.roles?.some((r) => r.role === "admin") ?? false;

  const handleTextChange = (key: string, val: string) => {
    setFormData((prev) => ({ ...prev, [key]: val }));
  };

  const handleFileUpload = async (key: string, file: File) => {
    try {
      setIsUploading((prev) => ({ ...prev, [key]: true }));
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `cms/${fileName}`;

      // Upload file to Supabase storage bucket 'site-assets'
      const { data, error } = await supabase.storage
        .from("site-assets")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) throw error;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("site-assets")
        .getPublicUrl(filePath);

      if (!urlData?.publicUrl) throw new Error("Could not retrieve file public URL.");

      handleTextChange(key, urlData.publicUrl);
      toast.success("File uploaded successfully.");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Upload failed. Verify storage bucket is created and policies are configured.");
    } finally {
      setIsUploading((prev) => ({ ...prev, [key]: false }));
    }
  };

  const saveChanges = async () => {
    try {
      // Map formData record back to list of { key, value }
      const items = Object.entries(formData).map(([k, v]) => ({
        key: k,
        value: v,
      }));

      await saveMutation.mutateAsync(items);
      toast.success("Website content saved successfully.");
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to save site content: " + err.message);
    }
  };

  if (isDashboardLoading || isContentLoading) {
    return (
      <PortalShell title="Loading CMS…">
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#c9a84c]" />
        </div>
      </PortalShell>
    );
  }

  // Access Denied Screen for non-admins
  if (!isAdmin) {
    return (
      <PortalShell title="Access Denied">
        <div className="max-w-md mx-auto text-center py-16 bg-[#2d2d2d] border border-[#3d3d3d] p-8 mt-12 animate-in fade-in">
          <AlertCircle className="h-16 w-16 mx-auto text-[#ea580c] mb-6 animate-pulse" />
          <h2 className="font-display text-2xl text-[#f5f5f0] mb-4">Unauthorized Access</h2>
          <p className="font-serif text-sm text-[#a8a8a0] leading-relaxed mb-8">
            You do not have the necessary permissions to access the Campfire CMS dashboard. Admin authorization is required.
          </p>
          <Link
            to="/portal"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#c9a84c] text-[#1a1a1a] text-[10px] tracking-[0.3em] uppercase hover:bg-[#b0903c] transition font-semibold"
          >
            Return to Campfire
          </Link>
        </div>
      </PortalShell>
    );
  }

  const defaultVal = (key: string, fallback: string) => {
    return formData[key] ?? fallback;
  };

  const localPhotoOptions = Object.keys(photos);

  return (
    <PortalShell title="Campfire CMS">
      <div className="max-w-5xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Intro description */}
        <div className="bg-[#2d2d2d] border border-[#3d3d3d] p-6 text-sm text-[#a8a8a0] leading-relaxed flex items-center gap-4">
          <FileText className="h-8 w-8 text-[#c9a84c] shrink-0" />
          <div>
            <span className="font-semibold text-[#f5f5f0]">Section Editor</span>: Update website descriptions, titles, backgrounds, and video telemetry. Revert to system defaults by leaving inputs blank, or upload new files to customize the safari experience.
          </div>
        </div>

        {/* CMS Tabs switcher */}
        <div className="flex flex-wrap gap-2 border-b border-[#3d3d3d] pb-px">
          {(
            [
              { id: "hero", label: "Hero Banner" },
              { id: "intro", label: "Welcome Intro" },
              { id: "pillars", label: "Three Pillars" },
              { id: "experience", label: "The Experience" },
              { id: "camp", label: "Base Camp" },
              { id: "quotes", label: "Quotes & CTA" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 text-xs tracking-[0.2em] uppercase transition border-b-2 font-medium ${
                activeTab === tab.id
                  ? "border-[#c9a84c] text-[#c9a84c]"
                  : "border-transparent text-[#a8a8a0] hover:text-[#f5f5f0]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab contents */}
        <div className="space-y-6">
          {activeTab === "hero" && (
            <div className="bg-[#2d2d2d] border border-[#3d3d3d] p-8 space-y-6">
              <h3 className="text-[10px] tracking-[0.4em] uppercase text-[#c9a84c] border-b border-[#3d3d3d] pb-3 mb-6">Hero Banner Configuration</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-2">Italic Title Prefix</label>
                  <input
                    value={defaultVal("home.hero.title_italic", "Welcome")}
                    onChange={(e) => handleTextChange("home.hero.title_italic", e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] focus:outline-none px-4 py-3 text-sm text-[#f5f5f0] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-2">Plain Title Suffix</label>
                  <input
                    value={defaultVal("home.hero.title_plain", ".")}
                    onChange={(e) => handleTextChange("home.hero.title_plain", e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] focus:outline-none px-4 py-3 text-sm text-[#f5f5f0] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-2">Concession Subtitle</label>
                <input
                  value={defaultVal("home.hero.subtitle", "In the heart of Tanzania")}
                  onChange={(e) => handleTextChange("home.hero.subtitle", e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] focus:outline-none px-4 py-3 text-sm text-[#f5f5f0] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-2">Hero Description</label>
                <textarea
                  value={defaultVal("home.hero.description", "To Africa's premier hunting club — where the chase is shaped by patience, craft, and respect.")}
                  onChange={(e) => handleTextChange("home.hero.description", e.target.value)}
                  rows={3}
                  className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] focus:outline-none px-4 py-3 text-sm text-[#f5f5f0] resize-none transition-colors"
                />
              </div>

              {/* Media Settings */}
              <div className="border-t border-[#3d3d3d] pt-6 grid md:grid-cols-2 gap-6">
                <MediaInput
                  label="Hero Video URL"
                  value={defaultVal("home.hero.video_url", "/media/hero-intro.mp4")}
                  onChange={(val) => handleTextChange("home.hero.video_url", val)}
                  onUpload={(file) => handleFileUpload("home.hero.video_url", file)}
                  isUploading={isUploading["home.hero.video_url"]}
                  placeholder="/media/hero-intro.mp4"
                />

                <MediaInput
                  label="Hero Video Poster (Image)"
                  value={defaultVal("home.hero.poster_url", "acaciaSunset")}
                  onChange={(val) => handleTextChange("home.hero.poster_url", val)}
                  onUpload={(file) => handleFileUpload("home.hero.poster_url", file)}
                  isUploading={isUploading["home.hero.poster_url"]}
                  localPhotos={localPhotoOptions}
                  placeholder="e.g. acaciaSunset"
                />
              </div>
            </div>
          )}

          {activeTab === "intro" && (
            <div className="bg-[#2d2d2d] border border-[#3d3d3d] p-8 space-y-6">
              <h3 className="text-[10px] tracking-[0.4em] uppercase text-[#c9a84c] border-b border-[#3d3d3d] pb-3 mb-6">Welcome Intro Section</h3>
              
              <div>
                <label className="block text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-2">Eyebrow</label>
                <input
                  value={defaultVal("home.intro.eyebrow", "Welcome, Tracker")}
                  onChange={(e) => handleTextChange("home.intro.eyebrow", e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] focus:outline-none px-4 py-3 text-sm text-[#f5f5f0] transition-colors"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-2">Title Line 1</label>
                  <input
                    value={defaultVal("home.intro.title_line1", "More than a hunt.")}
                    onChange={(e) => handleTextChange("home.intro.title_line1", e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] focus:outline-none px-4 py-3 text-sm text-[#f5f5f0] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-2">Title Line 2 (Italic)</label>
                  <input
                    value={defaultVal("home.intro.title_line2", "A legacy.")}
                    onChange={(e) => handleTextChange("home.intro.title_line2", e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] focus:outline-none px-4 py-3 text-sm text-[#f5f5f0] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-2">Intro Body Copy</label>
                <textarea
                  value={defaultVal(
                    "home.intro.body",
                    "Top Trackers is more than a hunting club. We are the meeting ground for a community of passionate hunters, conservationists, and wilderness enthusiasts — whether you are a seasoned safari veteran or preparing for your first African expedition."
                  )}
                  onChange={(e) => handleTextChange("home.intro.body", e.target.value)}
                  rows={4}
                  className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] focus:outline-none px-4 py-3 text-sm text-[#f5f5f0] resize-none transition-colors"
                />
              </div>
            </div>
          )}

          {activeTab === "pillars" && (
            <div className="bg-[#2d2d2d] border border-[#3d3d3d] p-8 space-y-6">
              <h3 className="text-[10px] tracking-[0.4em] uppercase text-[#c9a84c] border-b border-[#3d3d3d] pb-3 mb-6">Three Pillars</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-2">Pillar Eyebrow</label>
                  <input
                    value={defaultVal("home.pillars.eyebrow", "Three pillars")}
                    onChange={(e) => handleTextChange("home.pillars.eyebrow", e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] focus:outline-none px-4 py-3 text-sm text-[#f5f5f0] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-2">Pillar Section Title</label>
                  <input
                    value={defaultVal("home.pillars.title", "The Top Tracker's way.")}
                    onChange={(e) => handleTextChange("home.pillars.title", e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] focus:outline-none px-4 py-3 text-sm text-[#f5f5f0] transition-colors"
                  />
                </div>
              </div>

              {/* The 3 Columns */}
              <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-[#3d3d3d]">
                {/* Pillar 1 */}
                <div className="space-y-4">
                  <div className="text-xs text-[#c9a84c] font-medium uppercase font-mono">Pillar 1</div>
                  <div>
                    <label className="block text-[9px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-1">Title</label>
                    <input
                      value={defaultVal("home.pillars.1.title", "Patience")}
                      onChange={(e) => handleTextChange("home.pillars.1.title", e.target.value)}
                      className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] px-3 py-2 text-xs text-[#f5f5f0]"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-1">Body</label>
                    <textarea
                      value={defaultVal("home.pillars.1.body", "We hunt slow. Every track is read, every wind weighed. The chase is measured in days, not minutes.")}
                      onChange={(e) => handleTextChange("home.pillars.1.body", e.target.value)}
                      rows={4}
                      className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] px-3 py-2 text-xs text-[#f5f5f0] resize-none"
                    />
                  </div>
                </div>

                {/* Pillar 2 */}
                <div className="space-y-4">
                  <div className="text-xs text-[#c9a84c] font-medium uppercase font-mono">Pillar 2</div>
                  <div>
                    <label className="block text-[9px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-1">Title</label>
                    <input
                      value={defaultVal("home.pillars.2.title", "Craft")}
                      onChange={(e) => handleTextChange("home.pillars.2.title", e.target.value)}
                      className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] px-3 py-2 text-xs text-[#f5f5f0]"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-1">Body</label>
                    <textarea
                      value={defaultVal("home.pillars.2.body", "Professional hunters with decades across Tanzania's most storied concessions. Field-tested, quietly precise.")}
                      onChange={(e) => handleTextChange("home.pillars.2.body", e.target.value)}
                      rows={4}
                      className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] px-3 py-2 text-xs text-[#f5f5f0] resize-none"
                    />
                  </div>
                </div>

                {/* Pillar 3 */}
                <div className="space-y-4">
                  <div className="text-xs text-[#c9a84c] font-medium uppercase font-mono">Pillar 3</div>
                  <div>
                    <label className="block text-[9px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-1">Title</label>
                    <input
                      value={defaultVal("home.pillars.3.title", "Respect")}
                      onChange={(e) => handleTextChange("home.pillars.3.title", e.target.value)}
                      className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] px-3 py-2 text-xs text-[#f5f5f0]"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-1">Body</label>
                    <textarea
                      value={defaultVal("home.pillars.3.body", "For the animal, the land, and the communities who steward it. Conservation is the price of the privilege.")}
                      onChange={(e) => handleTextChange("home.pillars.3.body", e.target.value)}
                      rows={4}
                      className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] px-3 py-2 text-xs text-[#f5f5f0] resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "experience" && (
            <div className="bg-[#2d2d2d] border border-[#3d3d3d] p-8 space-y-6">
              <h3 className="text-[10px] tracking-[0.4em] uppercase text-[#c9a84c] border-b border-[#3d3d3d] pb-3 mb-6">The Experience Section</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-2">Eyebrow</label>
                  <input
                    value={defaultVal("home.experience.eyebrow", "The Experience")}
                    onChange={(e) => handleTextChange("home.experience.eyebrow", e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] focus:outline-none px-4 py-3 text-sm text-[#f5f5f0] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-2">Title</label>
                  <input
                    value={defaultVal("home.experience.title", "A safari shaped by patience, craft, and respect.")}
                    onChange={(e) => handleTextChange("home.experience.title", e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] focus:outline-none px-4 py-3 text-sm text-[#f5f5f0] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-2">Section Body</label>
                <textarea
                  value={defaultVal(
                    "home.experience.body",
                    "Each expedition is curated by professional hunters with decades of experience across Tanzania's most storied concessions. From your first inquiry to the final trophy shipment, every detail is attended to with the discretion and precision a serious hunter expects."
                  )}
                  onChange={(e) => handleTextChange("home.experience.body", e.target.value)}
                  rows={4}
                  className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] focus:outline-none px-4 py-3 text-sm text-[#f5f5f0] resize-none transition-colors"
                />
              </div>

              {/* Bullets & Image */}
              <div className="border-t border-[#3d3d3d] pt-6 grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <span className="block text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0]">Bullet Perks</span>
                  {[
                    { key: "home.experience.bullet_1", fallback: "Private concessions across the Selous, Maasai Steppe & Iringa" },
                    { key: "home.experience.bullet_2", fallback: "PH-led tracking with native Wagogo and Maasai scouts" },
                    { key: "home.experience.bullet_3", fallback: "Full-service tented camps with brass, canvas, and lantern light" },
                    { key: "home.experience.bullet_4", fallback: "Trophy preparation, documentation, and worldwide shipment" },
                  ].map((bullet, idx) => (
                    <div key={bullet.key} className="flex gap-3 items-center">
                      <span className="text-[#c9a84c] text-sm">◆</span>
                      <input
                        value={defaultVal(bullet.key, bullet.fallback)}
                        onChange={(e) => handleTextChange(bullet.key, e.target.value)}
                        className="flex-1 bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] px-3 py-2 text-xs text-[#f5f5f0]"
                      />
                    </div>
                  ))}
                </div>

                <MediaInput
                  label="Experience Feature Image"
                  value={defaultVal("home.experience.image_url", "hunterValley")}
                  onChange={(val) => handleTextChange("home.experience.image_url", val)}
                  onUpload={(file) => handleFileUpload("home.experience.image_url", file)}
                  isUploading={isUploading["home.experience.image_url"]}
                  localPhotos={localPhotoOptions}
                  placeholder="e.g. hunterValley"
                />
              </div>
            </div>
          )}

          {activeTab === "camp" && (
            <div className="bg-[#2d2d2d] border border-[#3d3d3d] p-8 space-y-6">
              <h3 className="text-[10px] tracking-[0.4em] uppercase text-[#c9a84c] border-b border-[#3d3d3d] pb-3 mb-6">Base Camp Section</h3>
              
              <div>
                <label className="block text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-2">Eyebrow</label>
                <input
                  value={defaultVal("home.camp.eyebrow", "The Camp")}
                  onChange={(e) => handleTextChange("home.camp.eyebrow", e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] focus:outline-none px-4 py-3 text-sm text-[#f5f5f0] transition-colors"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-2">Title Line 1</label>
                  <input
                    value={defaultVal("home.camp.title_line1", "Canvas, brass &")}
                    onChange={(e) => handleTextChange("home.camp.title_line1", e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] focus:outline-none px-4 py-3 text-sm text-[#f5f5f0] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-2">Title Line 2 (Italic)</label>
                  <input
                    value={defaultVal("home.camp.title_line2", "lantern light.")}
                    onChange={(e) => handleTextChange("home.camp.title_line2", e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] focus:outline-none px-4 py-3 text-sm text-[#f5f5f0] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-2">Base Camp Description</label>
                <textarea
                  value={defaultVal(
                    "home.camp.body",
                    "Our base camp sits beneath an acacia grove near Esilalei. Hand-stitched canvas tents, copper basins, an open-fire kitchen, and a long table where stories outlive the embers."
                  )}
                  onChange={(e) => handleTextChange("home.camp.body", e.target.value)}
                  rows={4}
                  className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] focus:outline-none px-4 py-3 text-sm text-[#f5f5f0] resize-none transition-colors"
                />
              </div>

              <div className="border-t border-[#3d3d3d] pt-6">
                <MediaInput
                  label="Base Camp Gallery Image"
                  value={defaultVal("home.camp.image_url", "campNight")}
                  onChange={(val) => handleTextChange("home.camp.image_url", val)}
                  onUpload={(file) => handleFileUpload("home.camp.image_url", file)}
                  isUploading={isUploading["home.camp.image_url"]}
                  localPhotos={localPhotoOptions}
                  placeholder="e.g. campNight"
                />
              </div>
            </div>
          )}

          {activeTab === "quotes" && (
            <div className="bg-[#2d2d2d] border border-[#3d3d3d] p-8 space-y-6">
              <h3 className="text-[10px] tracking-[0.4em] uppercase text-[#c9a84c] border-b border-[#3d3d3d] pb-3 mb-6">Quotes & CTA Footer Settings</h3>
              
              <div className="space-y-4">
                <span className="block text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0]">Campfire Quote Block</span>
                <div>
                  <label className="block text-[9px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-1">Quote Text</label>
                  <textarea
                    value={defaultVal(
                      "home.quote.text",
                      "In Africa, the hunt is not what you take from the land — it is what the land slowly teaches you to become."
                    )}
                    onChange={(e) => handleTextChange("home.quote.text", e.target.value)}
                    rows={3}
                    className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] px-3 py-2 text-xs text-[#f5f5f0] resize-none"
                  />
                </div>
                <div>
                  <label className="block text-[9px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-1">Author Attribution</label>
                  <input
                    value={defaultVal("home.quote.author", "Hemingway, paraphrased — and lived")}
                    onChange={(e) => handleTextChange("home.quote.author", e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] px-3 py-2 text-xs text-[#f5f5f0]"
                  />
                </div>
              </div>

              <div className="border-t border-[#3d3d3d] pt-6 space-y-4">
                <span className="block text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0]">Call To Action Banner</span>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-[9px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-1">CTA Eyebrow</label>
                    <input
                      value={defaultVal("home.cta.eyebrow", "Begin")}
                      onChange={(e) => handleTextChange("home.cta.eyebrow", e.target.value)}
                      className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] px-3 py-2 text-xs text-[#f5f5f0]"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-1">CTA Title (Regular)</label>
                    <input
                      value={defaultVal("home.cta.title_normal", "Plan your ")}
                      onChange={(e) => handleTextChange("home.cta.title_normal", e.target.value)}
                      className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] px-3 py-2 text-xs text-[#f5f5f0]"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-1">CTA Title (Italic)</label>
                    <input
                      value={defaultVal("home.cta.title_italic", "first chase")}
                      onChange={(e) => handleTextChange("home.cta.title_italic", e.target.value)}
                      className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] px-3 py-2 text-xs text-[#f5f5f0]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[9px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-1">CTA Body</label>
                  <textarea
                    value={defaultVal(
                      "home.cta.body",
                      "Tell us what you seek. We'll match you to a concession, a professional hunter, and a window of weather worth the journey."
                    )}
                    onChange={(e) => handleTextChange("home.cta.body", e.target.value)}
                    rows={3}
                    className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] px-3 py-2 text-xs text-[#f5f5f0] resize-none"
                  />
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Sticky footer Save Changes controls */}
        <div className="sticky bottom-4 flex items-center justify-between bg-[#1a1a1a]/95 backdrop-blur-md border border-[#3d3d3d] p-4 shadow-2xl z-30">
          <div className="text-[10px] tracking-[0.15em] uppercase text-[#a8a8a0] flex items-center gap-2">
            <HelpCircle className="h-4 w-4" /> Save updates to apply instantly
          </div>
          <div className="flex gap-4">
            <a 
              href="/" 
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#3d3d3d] hover:border-[#c9a84c] hover:text-[#c9a84c] text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] transition"
            >
              <Eye className="h-3.5 w-3.5" /> Preview Live
            </a>
            <button
              onClick={saveChanges}
              disabled={saveMutation.isPending}
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#c9a84c] text-[#1a1a1a] text-[10px] tracking-[0.3em] uppercase hover:bg-[#b0903c] transition font-semibold disabled:opacity-50"
            >
              {saveMutation.isPending ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Save className="h-3.5 w-3.5" />
              )}
              Save Content
            </button>
          </div>
        </div>

      </div>
    </PortalShell>
  );
}

// Reusable Media Selection / Upload component
function MediaInput({
  label,
  value,
  onChange,
  onUpload,
  isUploading,
  localPhotos = [],
  placeholder = "",
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  onUpload: (file: File) => void;
  isUploading?: boolean;
  localPhotos?: string[];
  placeholder?: string;
}) {
  const isLocalKey = localPhotos.includes(value);
  const isVideo = value.endsWith(".mp4") || value.includes("/media/");
  const previewSrc = isLocalKey ? resolveImage(value) : value;

  const selectLocal = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      onChange(e.target.value);
    }
  };

  const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="block text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0]">{label}</label>
        {isLocalKey && <span className="text-[9px] text-[#c9a84c] uppercase tracking-wider font-mono">Static Asset</span>}
      </div>

      <div className="grid grid-cols-5 gap-4">
        {/* Media Preview Box */}
        <div className="col-span-2 border border-[#3d3d3d] aspect-video bg-[#1a1a1a] flex items-center justify-center relative overflow-hidden group">
          {previewSrc ? (
            isVideo ? (
              <video src={previewSrc} className="w-full h-full object-cover" muted loop autoPlay playsInline />
            ) : (
              <img src={previewSrc} alt="Preview" className="w-full h-full object-cover" />
            )
          ) : (
            <span className="text-xs text-[#5a5a55] font-mono">No Media</span>
          )}
          {isUploading && (
            <div className="absolute inset-0 bg-[#1a1a1a]/80 flex items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin text-[#c9a84c]" />
            </div>
          )}
        </div>

        {/* Inputs */}
        <div className="col-span-3 space-y-3">
          {/* Custom URL Input */}
          <div>
            <label className="block text-[9px] tracking-[0.2em] uppercase text-[#a8a8a0]/70 mb-1">Media URL or Key</label>
            <input
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] px-3 py-2 text-xs text-[#f5f5f0] outline-none"
            />
          </div>

          <div className="flex gap-2">
            {/* Local photos selector (only if options are provided) */}
            {localPhotos.length > 0 && (
              <div className="flex-1">
                <select
                  onChange={selectLocal}
                  value={isLocalKey ? value : ""}
                  className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] px-3 py-2 text-xs text-[#f5f5f0] outline-none appearance-none"
                >
                  <option value="">-- Choose local photo --</option>
                  {localPhotos.map((k) => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* File Upload Button */}
            <div className="relative">
              <input
                type="file"
                accept="image/*,video/*"
                onChange={selectFile}
                className="hidden"
                id={`file-upload-${label.replace(/\s+/g, "-")}`}
                disabled={isUploading}
              />
              <label
                htmlFor={`file-upload-${label.replace(/\s+/g, "-")}`}
                className="inline-flex items-center gap-1.5 px-3 py-2 border border-[#3d3d3d] hover:border-[#c9a84c] hover:text-[#c9a84c] text-xs text-[#a8a8a0] transition cursor-pointer select-none"
              >
                {isUploading ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <>
                    <UploadCloud className="h-3.5 w-3.5" /> Upload
                  </>
                )}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
