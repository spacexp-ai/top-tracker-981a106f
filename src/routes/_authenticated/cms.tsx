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
  Loader2,
  Save,
  FileText,
  Image as ImageIcon,
  Compass,
  Quote,
  HelpCircle,
  Eye,
  AlertCircle,
  UploadCloud,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/cms")({
  head: () => ({ meta: [{ title: "Site CMS — Top Trackers" }] }),
  component: SiteCMS,
});

type CategoryType = "home" | "core" | "services" | "policies";

function SiteCMS() {
  const fn = useServerFn(getDashboard);
  const { data: dashboardData, isLoading: isDashboardLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => fn(),
  });

  const { data: content, isLoading: isContentLoading } = useSiteContent();
  const saveMutation = useSaveSiteContent();

  const [activeCategory, setActiveCategory] = useState<CategoryType>("home");
  const [activeSubTab, setActiveSubTab] = useState<string>("general");
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isUploading, setIsUploading] = useState<Record<string, boolean>>({});

  // Reset subtab when category changes
  useEffect(() => {
    if (activeCategory === "home") setActiveSubTab("general");
    else if (activeCategory === "core") setActiveSubTab("ourstory");
    else if (activeCategory === "services") setActiveSubTab("experience");
    else if (activeCategory === "policies") setActiveSubTab("faqs");
  }, [activeCategory]);

  // Hydrate local state when DB content loads
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

      const { data, error } = await supabase.storage.from("site-assets").upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

      if (error) throw error;

      const { data: urlData } = supabase.storage.from("site-assets").getPublicUrl(filePath);

      if (!urlData?.publicUrl) throw new Error("Could not retrieve file public URL.");

      handleTextChange(key, urlData.publicUrl);
      toast.success("File uploaded successfully.");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Upload failed. Make sure the storage bucket exists.");
    } finally {
      setIsUploading((prev) => ({ ...prev, [key]: false }));
    }
  };

  const saveChanges = async () => {
    try {
      const items = Object.entries(formData).map(([k, v]) => ({
        key: k,
        value: v,
      }));

      await saveMutation.mutateAsync(items);
      toast.success("All modifications successfully saved to database.");
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to save changes: " + err.message);
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

  if (!isAdmin) {
    return (
      <PortalShell title="Access Denied">
        <div className="max-w-md mx-auto text-center py-16 bg-[#2d2d2d] border border-[#3d3d3d] p-8 mt-12 animate-in fade-in">
          <AlertCircle className="h-16 w-16 mx-auto text-[#ea580c] mb-6 animate-pulse" />
          <h2 className="font-display text-2xl text-[#f5f5f0] mb-4">Unauthorized Access</h2>
          <p className="font-serif text-sm text-[#a8a8a0] leading-relaxed mb-8">
            You do not have the necessary permissions to access the Campfire CMS dashboard. Admin
            authorization is required.
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
    <PortalShell title="Site Content CMS">
      <div className="max-w-5xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Navigation Category Header */}
        <div className="flex flex-wrap gap-2 border-b border-[#3d3d3d] pb-px">
          {(
            [
              { id: "home", label: "Home Page" },
              { id: "core", label: "Core Pages" },
              { id: "services", label: "Services & Concessions" },
              { id: "policies", label: "FAQs & Legal Policies" },
            ] as const
          ).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-3 text-xs tracking-[0.2em] uppercase transition border-b-2 font-medium ${
                activeCategory === cat.id
                  ? "border-[#c9a84c] text-[#c9a84c] bg-[#2d2d2d]/30"
                  : "border-transparent text-[#a8a8a0] hover:text-[#f5f5f0]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sub-tab selection menu */}
        <div className="flex flex-wrap gap-2 bg-[#2d2d2d] border border-[#3d3d3d] p-2 text-xs">
          {activeCategory === "home" && (
            <>
              <SubTabBtn
                id="general"
                label="General Banner"
                active={activeSubTab}
                set={setActiveSubTab}
              />
              <SubTabBtn
                id="basecamp"
                label="Base Camp"
                active={activeSubTab}
                set={setActiveSubTab}
              />
              <SubTabBtn id="pillars" label="Pillars" active={activeSubTab} set={setActiveSubTab} />
            </>
          )}
          {activeCategory === "core" && (
            <>
              <SubTabBtn
                id="ourstory"
                label="Our Story"
                active={activeSubTab}
                set={setActiveSubTab}
              />
              <SubTabBtn
                id="partners"
                label="Partners"
                active={activeSubTab}
                set={setActiveSubTab}
              />
              <SubTabBtn id="gallery" label="Gallery" active={activeSubTab} set={setActiveSubTab} />
              <SubTabBtn
                id="contact"
                label="Contact Office"
                active={activeSubTab}
                set={setActiveSubTab}
              />
            </>
          )}
          {activeCategory === "services" && (
            <>
              <SubTabBtn
                id="experience"
                label="Expeditions"
                active={activeSubTab}
                set={setActiveSubTab}
              />
              <SubTabBtn
                id="services"
                label="Hunting Services"
                active={activeSubTab}
                set={setActiveSubTab}
              />
              <SubTabBtn
                id="conservation"
                label="Conservation Work"
                active={activeSubTab}
                set={setActiveSubTab}
              />
            </>
          )}
          {activeCategory === "policies" && (
            <>
              <SubTabBtn id="faqs" label="FAQs" active={activeSubTab} set={setActiveSubTab} />
              <SubTabBtn
                id="membership"
                label="Membership Tiers"
                active={activeSubTab}
                set={setActiveSubTab}
              />
              <SubTabBtn
                id="terms"
                label="Terms of Service"
                active={activeSubTab}
                set={setActiveSubTab}
              />
              <SubTabBtn
                id="privacy"
                label="Privacy Policy"
                active={activeSubTab}
                set={setActiveSubTab}
              />
            </>
          )}
        </div>

        {/* Edit fields grid */}
        <div className="space-y-6">
          {/* CATEGORY: HOME */}
          {activeCategory === "home" && activeSubTab === "general" && (
            <div className="bg-[#2d2d2d] border border-[#3d3d3d] p-8 space-y-6">
              <SectionHeader title="Homepage Hero & Intro Editor" />
              <TextInput
                label="Hero Subtitle"
                keyName="home.hero.subtitle"
                defaultVal={defaultVal}
                set={handleTextChange}
              />
              <div className="grid md:grid-cols-2 gap-6">
                <TextInput
                  label="Hero Title (Italic)"
                  keyName="home.hero.title_italic"
                  defaultVal={defaultVal}
                  set={handleTextChange}
                />
                <TextInput
                  label="Hero Title (Plain suffix)"
                  keyName="home.hero.title_plain"
                  defaultVal={defaultVal}
                  set={handleTextChange}
                />
              </div>
              <TextAreaInput
                label="Hero Description"
                keyName="home.hero.description"
                defaultVal={defaultVal}
                set={handleTextChange}
              />
              <div className="grid md:grid-cols-2 gap-6">
                <MediaInput
                  label="Hero Intro Video URL"
                  keyName="home.hero.video_url"
                  defaultVal={defaultVal}
                  set={handleTextChange}
                  onUpload={handleFileUpload}
                  isUploading={isUploading}
                  localPhotos={localPhotoOptions}
                />
                <MediaInput
                  label="Hero Video Poster (Image)"
                  keyName="home.hero.poster_url"
                  defaultVal={defaultVal}
                  set={handleTextChange}
                  onUpload={handleFileUpload}
                  isUploading={isUploading}
                  localPhotos={localPhotoOptions}
                />
              </div>
              <div className="border-t border-[#3d3d3d] pt-6 space-y-6">
                <TextInput
                  label="Intro Eyebrow"
                  keyName="home.intro.eyebrow"
                  defaultVal={defaultVal}
                  set={handleTextChange}
                />
                <div className="grid md:grid-cols-2 gap-6">
                  <TextInput
                    label="Intro Title Line 1"
                    keyName="home.intro.title_line1"
                    defaultVal={defaultVal}
                    set={handleTextChange}
                  />
                  <TextInput
                    label="Intro Title Line 2 (Italic)"
                    keyName="home.intro.title_line2"
                    defaultVal={defaultVal}
                    set={handleTextChange}
                  />
                </div>
                <TextAreaInput
                  label="Intro Body Description"
                  keyName="home.intro.body"
                  defaultVal={defaultVal}
                  set={handleTextChange}
                />
              </div>
            </div>
          )}

          {activeCategory === "home" && activeSubTab === "basecamp" && (
            <div className="bg-[#2d2d2d] border border-[#3d3d3d] p-8 space-y-6">
              <SectionHeader title="Base Camp & Quotes Editor" />
              <div className="grid md:grid-cols-2 gap-6">
                <TextInput
                  label="Camp Title Line 1"
                  keyName="home.camp.title_line1"
                  defaultVal={defaultVal}
                  set={handleTextChange}
                />
                <TextInput
                  label="Camp Title Line 2 (Italic)"
                  keyName="home.camp.title_line2"
                  defaultVal={defaultVal}
                  set={handleTextChange}
                />
              </div>
              <TextAreaInput
                label="Camp Details Copy"
                keyName="home.camp.body"
                defaultVal={defaultVal}
                set={handleTextChange}
              />
              <MediaInput
                label="Camp Background Image"
                keyName="home.camp.image_url"
                defaultVal={defaultVal}
                set={handleTextChange}
                onUpload={handleFileUpload}
                isUploading={isUploading}
                localPhotos={localPhotoOptions}
              />

              <div className="border-t border-[#3d3d3d] pt-6 space-y-6">
                <TextAreaInput
                  label="Quotes Block Text"
                  keyName="home.quote.text"
                  defaultVal={defaultVal}
                  set={handleTextChange}
                />
                <TextInput
                  label="Quote Author / Title"
                  keyName="home.quote.author"
                  defaultVal={defaultVal}
                  set={handleTextChange}
                />
              </div>
            </div>
          )}

          {activeCategory === "home" && activeSubTab === "pillars" && (
            <div className="bg-[#2d2d2d] border border-[#3d3d3d] p-8 space-y-6">
              <SectionHeader title="Three Pillars Editor" />
              <TextInput
                label="Pillars Eyebrow"
                keyName="home.pillars.eyebrow"
                defaultVal={defaultVal}
                set={handleTextChange}
              />
              <TextInput
                label="Pillars Section Title"
                keyName="home.pillars.title"
                defaultVal={defaultVal}
                set={handleTextChange}
              />
              <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-[#3d3d3d]">
                <PillarFields id="1" defaultVal={defaultVal} set={handleTextChange} />
                <PillarFields id="2" defaultVal={defaultVal} set={handleTextChange} />
                <PillarFields id="3" defaultVal={defaultVal} set={handleTextChange} />
              </div>
            </div>
          )}

          {/* CATEGORY: CORE */}
          {activeCategory === "core" && activeSubTab === "ourstory" && (
            <div className="bg-[#2d2d2d] border border-[#3d3d3d] p-8 space-y-6">
              <SectionHeader title="Our Story Page Content" />
              <MediaInput
                label="Story Hero Image"
                keyName="ourstory.hero.image"
                defaultVal={defaultVal}
                set={handleTextChange}
                onUpload={handleFileUpload}
                isUploading={isUploading}
                localPhotos={localPhotoOptions}
              />
              <TextInput
                label="Story Eyebrow"
                keyName="ourstory.hero.eyebrow"
                defaultVal={defaultVal}
                set={handleTextChange}
              />
              <div className="grid md:grid-cols-2 gap-6">
                <TextInput
                  label="Story Title Line 1"
                  keyName="ourstory.hero.title_line1"
                  defaultVal={defaultVal}
                  set={handleTextChange}
                />
                <TextInput
                  label="Story Title Line 2 (Italic)"
                  keyName="ourstory.hero.title_line2"
                  defaultVal={defaultVal}
                  set={handleTextChange}
                />
              </div>
              <TextInput
                label="Story Subtitle description"
                keyName="ourstory.hero.subtitle"
                defaultVal={defaultVal}
                set={handleTextChange}
              />
              <TextAreaInput
                label="Intro Section Highlight"
                keyName="ourstory.intro.highlight"
                defaultVal={defaultVal}
                set={handleTextChange}
              />
              <TextAreaInput
                label="Intro Body 1"
                keyName="ourstory.intro.body1"
                defaultVal={defaultVal}
                set={handleTextChange}
              />
              <TextAreaInput
                label="Intro Body 2"
                keyName="ourstory.intro.body2"
                defaultVal={defaultVal}
                set={handleTextChange}
              />
              <TextInput
                label="Intro Callout (Italic)"
                keyName="ourstory.intro.callout"
                defaultVal={defaultVal}
                set={handleTextChange}
              />

              <div className="border-t border-[#3d3d3d] pt-6 space-y-6">
                <h4 className="text-[10px] tracking-[0.35em] uppercase text-[#c9a84c]">
                  Timeline Milestones
                </h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <TimelineFields
                    id="1"
                    defaultVal={defaultVal}
                    set={handleTextChange}
                    localPhotos={localPhotoOptions}
                    onUpload={handleFileUpload}
                    isUploading={isUploading}
                  />
                  <TimelineFields
                    id="2"
                    defaultVal={defaultVal}
                    set={handleTextChange}
                    localPhotos={localPhotoOptions}
                    onUpload={handleFileUpload}
                    isUploading={isUploading}
                  />
                  <TimelineFields
                    id="3"
                    defaultVal={defaultVal}
                    set={handleTextChange}
                    localPhotos={localPhotoOptions}
                    onUpload={handleFileUpload}
                    isUploading={isUploading}
                  />
                  <TimelineFields
                    id="4"
                    defaultVal={defaultVal}
                    set={handleTextChange}
                    localPhotos={localPhotoOptions}
                    onUpload={handleFileUpload}
                    isUploading={isUploading}
                  />
                </div>
              </div>
            </div>
          )}

          {activeCategory === "core" && activeSubTab === "partners" && (
            <div className="bg-[#2d2d2d] border border-[#3d3d3d] p-8 space-y-6">
              <SectionHeader title="Partners Page Content" />
              <MediaInput
                label="Partners Hero Image"
                keyName="partners.hero.image"
                defaultVal={defaultVal}
                set={handleTextChange}
                onUpload={handleFileUpload}
                isUploading={isUploading}
                localPhotos={localPhotoOptions}
              />
              <TextInput
                label="Partners Eyebrow"
                keyName="partners.hero.eyebrow"
                defaultVal={defaultVal}
                set={handleTextChange}
              />
              <div className="grid md:grid-cols-2 gap-6">
                <TextInput
                  label="Partners Title (Italic)"
                  keyName="partners.hero.title_italic"
                  defaultVal={defaultVal}
                  set={handleTextChange}
                />
                <TextInput
                  label="Partners Title (Plain suffix)"
                  keyName="partners.hero.title_plain"
                  defaultVal={defaultVal}
                  set={handleTextChange}
                />
              </div>
              <div className="border-t border-[#3d3d3d] pt-6 space-y-6">
                <h4 className="text-[10px] tracking-[0.35em] uppercase text-[#c9a84c]">
                  Partners Lanes
                </h4>
                <div className="space-y-8">
                  <PartnerLaneFields id="1" defaultVal={defaultVal} set={handleTextChange} />
                  <PartnerLaneFields id="2" defaultVal={defaultVal} set={handleTextChange} />
                  <PartnerLaneFields id="3" defaultVal={defaultVal} set={handleTextChange} />
                </div>
              </div>
            </div>
          )}

          {activeCategory === "core" && activeSubTab === "gallery" && (
            <div className="bg-[#2d2d2d] border border-[#3d3d3d] p-8 space-y-6">
              <SectionHeader title="Gallery Header & Descriptions" />
              <MediaInput
                label="Gallery Hero Background"
                keyName="gallery.hero.bg"
                defaultVal={defaultVal}
                set={handleTextChange}
                onUpload={handleFileUpload}
                isUploading={isUploading}
                localPhotos={localPhotoOptions}
              />
              <TextInput
                label="Gallery Eyebrow"
                keyName="gallery.hero.eyebrow"
                defaultVal={defaultVal}
                set={handleTextChange}
              />
              <div className="grid md:grid-cols-2 gap-6">
                <TextInput
                  label="Gallery Title (Normal)"
                  keyName="gallery.hero.title_normal"
                  defaultVal={defaultVal}
                  set={handleTextChange}
                />
                <TextInput
                  label="Gallery Title (Italic)"
                  keyName="gallery.hero.title_italic"
                  defaultVal={defaultVal}
                  set={handleTextChange}
                />
              </div>
              <TextAreaInput
                label="Gallery Page Body"
                keyName="gallery.hero.body"
                defaultVal={defaultVal}
                set={handleTextChange}
              />

              <div className="border-t border-[#3d3d3d] pt-6 space-y-6">
                <h4 className="text-[10px] tracking-[0.35em] uppercase text-[#c9a84c]">
                  Gallery Section Headings
                </h4>
                {["quarry", "camp", "field", "country"].map((sec) => (
                  <div
                    key={sec}
                    className="p-4 border border-[#3d3d3d] bg-[#1a1a1a]/50 grid md:grid-cols-3 gap-4"
                  >
                    <TextInput
                      label={`${sec.toUpperCase()} Eyebrow`}
                      keyName={`gallery.sections.${sec}.eyebrow`}
                      defaultVal={defaultVal}
                      set={handleTextChange}
                    />
                    <TextInput
                      label={`${sec.toUpperCase()} Title`}
                      keyName={`gallery.sections.${sec}.title`}
                      defaultVal={defaultVal}
                      set={handleTextChange}
                    />
                    <TextInput
                      label={`${sec.toUpperCase()} Description`}
                      keyName={`gallery.sections.${sec}.body`}
                      defaultVal={defaultVal}
                      set={handleTextChange}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeCategory === "core" && activeSubTab === "contact" && (
            <div className="bg-[#2d2d2d] border border-[#3d3d3d] p-8 space-y-6">
              <SectionHeader title="Contact Page & Office Details" />
              <MediaInput
                label="Contact Hero Banner"
                keyName="contact.hero.image"
                defaultVal={defaultVal}
                set={handleTextChange}
                onUpload={handleFileUpload}
                isUploading={isUploading}
                localPhotos={localPhotoOptions}
              />
              <TextInput
                label="Contact Eyebrow"
                keyName="contact.hero.eyebrow"
                defaultVal={defaultVal}
                set={handleTextChange}
              />
              <div className="grid md:grid-cols-2 gap-6">
                <TextInput
                  label="Contact Title Normal"
                  keyName="contact.hero.title_normal"
                  defaultVal={defaultVal}
                  set={handleTextChange}
                />
                <TextInput
                  label="Contact Title Italic"
                  keyName="contact.hero.title_italic"
                  defaultVal={defaultVal}
                  set={handleTextChange}
                />
              </div>

              <div className="border-t border-[#3d3d3d] pt-6 grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-[10px] tracking-[0.35em] uppercase text-[#c9a84c] mb-4">
                    Office Details
                  </h4>
                  <div className="space-y-4">
                    <TextInput
                      label="Office Label"
                      keyName="contact.office.title"
                      defaultVal={defaultVal}
                      set={handleTextChange}
                    />
                    <TextInput
                      label="Office Address"
                      keyName="contact.office.address"
                      defaultVal={defaultVal}
                      set={handleTextChange}
                    />
                    <TextInput
                      label="Office Phone"
                      keyName="contact.office.phone"
                      defaultVal={defaultVal}
                      set={handleTextChange}
                    />
                    <TextInput
                      label="Office Email"
                      keyName="contact.office.email"
                      defaultVal={defaultVal}
                      set={handleTextChange}
                    />
                  </div>
                </div>
                <div>
                  <h4 className="text-[10px] tracking-[0.35em] uppercase text-[#c9a84c] mb-4">
                    Base Camp Coordinates
                  </h4>
                  <div className="space-y-4">
                    <TextInput
                      label="Camp Label"
                      keyName="contact.camp.title"
                      defaultVal={defaultVal}
                      set={handleTextChange}
                    />
                    <TextInput
                      label="Camp Description"
                      keyName="contact.camp.body"
                      defaultVal={defaultVal}
                      set={handleTextChange}
                    />
                    <TextInput
                      label="Camp Coordinates"
                      keyName="contact.camp.coordinates"
                      defaultVal={defaultVal}
                      set={handleTextChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CATEGORY: SERVICES */}
          {activeCategory === "services" && activeSubTab === "experience" && (
            <div className="bg-[#2d2d2d] border border-[#3d3d3d] p-8 space-y-6">
              <SectionHeader title="Expeditions & Experience Details" />
              <MediaInput
                label="Experience Hero Banner"
                keyName="experience.hero.image"
                defaultVal={defaultVal}
                set={handleTextChange}
                onUpload={handleFileUpload}
                isUploading={isUploading}
                localPhotos={localPhotoOptions}
              />
              <div className="grid md:grid-cols-2 gap-6">
                <TextInput
                  label="Hero Title Normal"
                  keyName="experience.hero.title_line1"
                  defaultVal={defaultVal}
                  set={handleTextChange}
                />
                <TextInput
                  label="Hero Title Italic"
                  keyName="experience.hero.title_italic"
                  defaultVal={defaultVal}
                  set={handleTextChange}
                />
              </div>

              <div className="border-t border-[#3d3d3d] pt-6 space-y-6">
                <h4 className="text-[10px] tracking-[0.35em] uppercase text-[#c9a84c]">
                  Expeditions Carousel (Edit Tiers 1-3)
                </h4>
                {[1, 2, 3].map((expNum) => (
                  <div
                    key={expNum}
                    className="p-4 border border-[#3d3d3d] bg-[#1a1a1a]/50 space-y-4"
                  >
                    <span className="font-mono text-xs text-[#c9a84c] uppercase">
                      Expedition {expNum}
                    </span>
                    <div className="grid md:grid-cols-3 gap-4">
                      <TextInput
                        label="Expedition Title"
                        keyName={`experience.expeditions.${expNum}.title`}
                        defaultVal={defaultVal}
                        set={handleTextChange}
                      />
                      <TextInput
                        label="Duration"
                        keyName={`experience.expeditions.${expNum}.duration`}
                        defaultVal={defaultVal}
                        set={handleTextChange}
                      />
                      <TextInput
                        label="Season"
                        keyName={`experience.expeditions.${expNum}.season`}
                        defaultVal={defaultVal}
                        set={handleTextChange}
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <TextInput
                        label="Party Size"
                        keyName={`experience.expeditions.${expNum}.party`}
                        defaultVal={defaultVal}
                        set={handleTextChange}
                      />
                      <TextInput
                        label="Target Quarry"
                        keyName={`experience.expeditions.${expNum}.quarry`}
                        defaultVal={defaultVal}
                        set={handleTextChange}
                      />
                    </div>
                    <TextAreaInput
                      label="Expedition Description"
                      keyName={`experience.expeditions.${expNum}.desc`}
                      defaultVal={defaultVal}
                      set={handleTextChange}
                    />
                    <MediaInput
                      label="Expedition Cover Image"
                      keyName={`experience.expeditions.${expNum}.image`}
                      defaultVal={defaultVal}
                      set={handleTextChange}
                      onUpload={handleFileUpload}
                      isUploading={isUploading}
                      localPhotos={localPhotoOptions}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeCategory === "services" && activeSubTab === "services" && (
            <div className="bg-[#2d2d2d] border border-[#3d3d3d] p-8 space-y-6">
              <SectionHeader title="Hunting Services list" />
              <MediaInput
                label="Services Hero Image"
                keyName="services.hero.image"
                defaultVal={defaultVal}
                set={handleTextChange}
                onUpload={handleFileUpload}
                isUploading={isUploading}
                localPhotos={localPhotoOptions}
              />
              <div className="grid md:grid-cols-2 gap-6">
                <TextInput
                  label="Services Title Normal"
                  keyName="services.hero.title_normal"
                  defaultVal={defaultVal}
                  set={handleTextChange}
                />
                <TextInput
                  label="Services Title Italic"
                  keyName="services.hero.title_italic"
                  defaultVal={defaultVal}
                  set={handleTextChange}
                />
              </div>
              <div className="border-t border-[#3d3d3d] pt-6 space-y-6">
                <h4 className="text-[10px] tracking-[0.35em] uppercase text-[#c9a84c]">
                  Services Items
                </h4>
                <div className="grid md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((srvNum) => (
                    <div
                      key={srvNum}
                      className="p-4 border border-[#3d3d3d] bg-[#1a1a1a]/50 space-y-3"
                    >
                      <TextInput
                        label={`Service ${srvNum} Title`}
                        keyName={`services.list.${srvNum}.title`}
                        defaultVal={defaultVal}
                        set={handleTextChange}
                      />
                      <TextAreaInput
                        label="Service Body"
                        keyName={`services.list.${srvNum}.body`}
                        defaultVal={defaultVal}
                        set={handleTextChange}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeCategory === "services" && activeSubTab === "conservation" && (
            <div className="bg-[#2d2d2d] border border-[#3d3d3d] p-8 space-y-6">
              <SectionHeader title="Conservation Work Page" />
              <MediaInput
                label="Conservation Hero Image"
                keyName="conservation.hero.image"
                defaultVal={defaultVal}
                set={handleTextChange}
                onUpload={handleFileUpload}
                isUploading={isUploading}
                localPhotos={localPhotoOptions}
              />
              <div className="grid md:grid-cols-2 gap-6">
                <TextInput
                  label="Conservation Title Normal"
                  keyName="conservation.hero.title_normal"
                  defaultVal={defaultVal}
                  set={handleTextChange}
                />
                <TextInput
                  label="Conservation Title Italic"
                  keyName="conservation.hero.title_italic"
                  defaultVal={defaultVal}
                  set={handleTextChange}
                />
              </div>
              <TextAreaInput
                label="Conservation Body"
                keyName="conservation.hero.body"
                defaultVal={defaultVal}
                set={handleTextChange}
              />

              <div className="border-t border-[#3d3d3d] pt-6 grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-[10px] tracking-[0.35em] uppercase text-[#c9a84c] mb-4">
                    Ledger Stats
                  </h4>
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((statId) => (
                      <div key={statId} className="flex gap-2">
                        <input
                          value={defaultVal(`conservation.stats.${statId}.value`, "")}
                          onChange={(e) =>
                            handleTextChange(`conservation.stats.${statId}.value`, e.target.value)
                          }
                          placeholder="Value"
                          className="w-1/3 bg-[#1a1a1a] border border-[#3d3d3d] px-3 py-2 text-xs text-[#f5f5f0]"
                        />
                        <input
                          value={defaultVal(`conservation.stats.${statId}.label`, "")}
                          onChange={(e) =>
                            handleTextChange(`conservation.stats.${statId}.label`, e.target.value)
                          }
                          placeholder="Label"
                          className="w-2/3 bg-[#1a1a1a] border border-[#3d3d3d] px-3 py-2 text-xs text-[#f5f5f0]"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-[10px] tracking-[0.35em] uppercase text-[#c9a84c] mb-4">
                    Pillars (Sample Edit 1)
                  </h4>
                  <div className="space-y-4">
                    <TextInput
                      label="Pillar 1 Title"
                      keyName="conservation.pillars.1.title"
                      defaultVal={defaultVal}
                      set={handleTextChange}
                    />
                    <TextAreaInput
                      label="Pillar 1 Description"
                      keyName="conservation.pillars.1.body"
                      defaultVal={defaultVal}
                      set={handleTextChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CATEGORY: POLICIES */}
          {activeCategory === "policies" && activeSubTab === "faqs" && (
            <div className="bg-[#2d2d2d] border border-[#3d3d3d] p-8 space-y-6">
              <SectionHeader title="Frequently Asked Questions Editor" />
              <div className="grid md:grid-cols-2 gap-6">
                <TextInput
                  label="FAQs Title Normal"
                  keyName="faqs.hero.title_normal"
                  defaultVal={defaultVal}
                  set={handleTextChange}
                />
                <TextInput
                  label="FAQs Title Italic"
                  keyName="faqs.hero.title_italic"
                  defaultVal={defaultVal}
                  set={handleTextChange}
                />
              </div>
              <div className="border-t border-[#3d3d3d] pt-6 space-y-6">
                <h4 className="text-[10px] tracking-[0.35em] uppercase text-[#c9a84c]">
                  Accordion Questions & Answers
                </h4>
                {[1, 2, 3, 4, 5, 6, 7].map((faqNum) => (
                  <div
                    key={faqNum}
                    className="p-4 border border-[#3d3d3d] bg-[#1a1a1a]/50 space-y-3"
                  >
                    <TextInput
                      label={`Question ${faqNum}`}
                      keyName={`faqs.${faqNum}.q`}
                      defaultVal={defaultVal}
                      set={handleTextChange}
                    />
                    <TextAreaInput
                      label={`Answer ${faqNum}`}
                      keyName={`faqs.${faqNum}.a`}
                      defaultVal={defaultVal}
                      set={handleTextChange}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeCategory === "policies" && activeSubTab === "membership" && (
            <div className="bg-[#2d2d2d] border border-[#3d3d3d] p-8 space-y-6">
              <SectionHeader title="Membership Tiers Content" />
              <MediaInput
                label="Membership Hero Image"
                keyName="membership.hero.image"
                defaultVal={defaultVal}
                set={handleTextChange}
                onUpload={handleFileUpload}
                isUploading={isUploading}
                localPhotos={localPhotoOptions}
              />
              <TextInput
                label="Membership Hero Title"
                keyName="membership.hero.title"
                defaultVal={defaultVal}
                set={handleTextChange}
              />
              <TextAreaInput
                label="Membership Description"
                keyName="membership.hero.body"
                defaultVal={defaultVal}
                set={handleTextChange}
              />

              <div className="border-t border-[#3d3d3d] pt-6 space-y-6">
                <h4 className="text-[10px] tracking-[0.35em] uppercase text-[#c9a84c]">
                  Tiers Custom Perks (Sample Tier 2 Tracker)
                </h4>
                <TextInput
                  label="Tier 2 Name"
                  keyName="membership.tier.2.name"
                  defaultVal={defaultVal}
                  set={handleTextChange}
                />
                <TextInput
                  label="Tier 2 Price"
                  keyName="membership.tier.2.price"
                  defaultVal={defaultVal}
                  set={handleTextChange}
                />
                <div className="grid md:grid-cols-2 gap-4">
                  <TextInput
                    label="Perk 1"
                    keyName="membership.tier.2.perk_1"
                    defaultVal={defaultVal}
                    set={handleTextChange}
                  />
                  <TextInput
                    label="Perk 2"
                    keyName="membership.tier.2.perk_2"
                    defaultVal={defaultVal}
                    set={handleTextChange}
                  />
                </div>
              </div>
            </div>
          )}

          {activeCategory === "policies" && activeSubTab === "terms" && (
            <div className="bg-[#2d2d2d] border border-[#3d3d3d] p-8 space-y-6">
              <SectionHeader title="Terms of Service Sections" />
              <TextInput
                label="Terms Title"
                keyName="terms.hero.title"
                defaultVal={defaultVal}
                set={handleTextChange}
              />
              <TextInput
                label="Last Updated Date"
                keyName="terms.hero.date"
                defaultVal={defaultVal}
                set={handleTextChange}
              />
              <TextAreaInput
                label="Terms Introduction"
                keyName="terms.intro"
                defaultVal={defaultVal}
                set={handleTextChange}
              />

              <div className="border-t border-[#3d3d3d] pt-6 space-y-4">
                <h4 className="text-[10px] tracking-[0.35em] uppercase text-[#c9a84c]">Sections</h4>
                {[1, 2, 3, 4, 5, 6].map((idx) => (
                  <div key={idx} className="p-4 border border-[#3d3d3d] bg-[#1a1a1a]/50 space-y-3">
                    <TextInput
                      label={`Section ${idx} Heading`}
                      keyName={`terms.section.${idx}.title`}
                      defaultVal={defaultVal}
                      set={handleTextChange}
                    />
                    <TextAreaInput
                      label={`Section ${idx} Description`}
                      keyName={`terms.section.${idx}.body`}
                      defaultVal={defaultVal}
                      set={handleTextChange}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeCategory === "policies" && activeSubTab === "privacy" && (
            <div className="bg-[#2d2d2d] border border-[#3d3d3d] p-8 space-y-6">
              <SectionHeader title="Privacy Policy Sections" />
              <TextInput
                label="Privacy Title"
                keyName="privacy.hero.title"
                defaultVal={defaultVal}
                set={handleTextChange}
              />
              <TextInput
                label="Last Updated Date"
                keyName="privacy.hero.date"
                defaultVal={defaultVal}
                set={handleTextChange}
              />
              <TextAreaInput
                label="Privacy Introduction"
                keyName="privacy.intro"
                defaultVal={defaultVal}
                set={handleTextChange}
              />

              <div className="border-t border-[#3d3d3d] pt-6 space-y-4">
                <h4 className="text-[10px] tracking-[0.35em] uppercase text-[#c9a84c]">Sections</h4>
                {[1, 2, 3, 4, 5].map((idx) => (
                  <div key={idx} className="p-4 border border-[#3d3d3d] bg-[#1a1a1a]/50 space-y-3">
                    <TextInput
                      label={`Section ${idx} Heading`}
                      keyName={`privacy.section.${idx}.title`}
                      defaultVal={defaultVal}
                      set={handleTextChange}
                    />
                    <TextAreaInput
                      label={`Section ${idx} Description`}
                      keyName={`privacy.section.${idx}.body`}
                      defaultVal={defaultVal}
                      set={handleTextChange}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Controls */}
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

// Reusable Components inside CMS to keep portal code clean and legible

function SubTabBtn({
  id,
  label,
  active,
  set,
}: {
  id: string;
  label: string;
  active: string;
  set: (id: string) => void;
}) {
  const isActive = active === id;
  return (
    <button
      onClick={() => set(id)}
      className={`px-3 py-2 transition flex items-center gap-1 border-r border-[#3d3d3d] ${
        isActive ? "text-[#c9a84c] font-medium" : "text-[#a8a8a0] hover:text-[#f5f5f0]"
      }`}
    >
      {label} {isActive && <ChevronRight className="h-3 w-3 text-[#c9a84c]" />}
    </button>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <h3 className="text-[10px] tracking-[0.4em] uppercase text-[#c9a84c] border-b border-[#3d3d3d] pb-3 mb-6">
      {title}
    </h3>
  );
}

function TextInput({
  label,
  keyName,
  defaultVal,
  set,
}: {
  label: string;
  keyName: string;
  defaultVal: (k: string, f: string) => string;
  set: (k: string, v: string) => void;
}) {
  return (
    <div>
      <label className="block text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-2">
        {label}
      </label>
      <input
        value={defaultVal(keyName, "")}
        onChange={(e) => set(keyName, e.target.value)}
        className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] focus:outline-none px-4 py-3 text-sm text-[#f5f5f0] transition-colors"
      />
    </div>
  );
}

function TextAreaInput({
  label,
  keyName,
  defaultVal,
  set,
}: {
  label: string;
  keyName: string;
  defaultVal: (k: string, f: string) => string;
  set: (k: string, v: string) => void;
}) {
  return (
    <div>
      <label className="block text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-2">
        {label}
      </label>
      <textarea
        value={defaultVal(keyName, "")}
        onChange={(e) => set(keyName, e.target.value)}
        rows={3}
        className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] focus:outline-none px-4 py-3 text-sm text-[#f5f5f0] resize-none transition-colors font-serif"
      />
    </div>
  );
}

function PillarFields({
  id,
  defaultVal,
  set,
}: {
  id: string;
  defaultVal: (k: string, f: string) => string;
  set: (k: string, v: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="text-xs text-[#c9a84c] font-medium uppercase font-mono">Pillar {id}</div>
      <TextInput
        label="Title"
        keyName={`home.pillars.${id}.title`}
        defaultVal={defaultVal}
        set={set}
      />
      <TextAreaInput
        label="Body Text"
        keyName={`home.pillars.${id}.body`}
        defaultVal={defaultVal}
        set={set}
      />
    </div>
  );
}

function TimelineFields({
  id,
  defaultVal,
  set,
  localPhotos,
  onUpload,
  isUploading,
}: {
  id: string;
  defaultVal: (k: string, f: string) => string;
  set: (k: string, v: string) => void;
  localPhotos: string[];
  onUpload: (k: string, f: File) => void;
  isUploading: Record<string, boolean>;
}) {
  return (
    <div className="p-4 border border-[#3d3d3d] bg-[#1a1a1a]/50 space-y-4">
      <div className="text-xs text-[#c9a84c] font-medium uppercase font-mono">Milestone {id}</div>
      <div className="grid grid-cols-2 gap-4">
        <TextInput
          label="Year"
          keyName={`ourstory.timeline.${id}.year`}
          defaultVal={defaultVal}
          set={set}
        />
        <TextInput
          label="Title"
          keyName={`ourstory.timeline.${id}.title`}
          defaultVal={defaultVal}
          set={set}
        />
      </div>
      <TextAreaInput
        label="Description"
        keyName={`ourstory.timeline.${id}.body`}
        defaultVal={defaultVal}
        set={set}
      />
      <MediaInput
        label="Hover Photo"
        keyName={`ourstory.timeline.${id}.image`}
        defaultVal={defaultVal}
        set={set}
        onUpload={onUpload}
        isUploading={isUploading}
        localPhotos={localPhotos}
      />
    </div>
  );
}

function PartnerLaneFields({
  id,
  defaultVal,
  set,
}: {
  id: string;
  defaultVal: (k: string, f: string) => string;
  set: (k: string, v: string) => void;
}) {
  return (
    <div className="p-4 border border-[#3d3d3d] bg-[#1a1a1a]/50 space-y-4">
      <div className="text-xs text-[#c9a84c] font-medium uppercase font-mono">
        Partner Lane {id}
      </div>
      <TextInput
        label="Lane Title"
        keyName={`partners.lane.${id}.title`}
        defaultVal={defaultVal}
        set={set}
      />
      <TextAreaInput
        label="Description"
        keyName={`partners.lane.${id}.body`}
        defaultVal={defaultVal}
        set={set}
      />
      <div className="grid md:grid-cols-4 gap-4">
        <TextInput
          label="Perk 1"
          keyName={`partners.lane.${id}.perk_1`}
          defaultVal={defaultVal}
          set={set}
        />
        <TextInput
          label="Perk 2"
          keyName={`partners.lane.${id}.perk_2`}
          defaultVal={defaultVal}
          set={set}
        />
        <TextInput
          label="Perk 3"
          keyName={`partners.lane.${id}.perk_3`}
          defaultVal={defaultVal}
          set={set}
        />
        <TextInput
          label="Perk 4"
          keyName={`partners.lane.${id}.perk_4`}
          defaultVal={defaultVal}
          set={set}
        />
      </div>
    </div>
  );
}

function MediaInput({
  label,
  keyName,
  defaultVal,
  set,
  onUpload,
  isUploading,
  localPhotos = [],
}: {
  label: string;
  keyName: string;
  defaultVal: (k: string, f: string) => string;
  set: (k: string, v: string) => void;
  onUpload: (k: string, f: File) => void;
  isUploading: Record<string, boolean>;
  localPhotos?: string[];
}) {
  const value = defaultVal(keyName, "");
  const isLocalKey = localPhotos.includes(value);
  const isVideo = value.endsWith(".mp4") || value.includes("/media/");
  const previewSrc = isLocalKey ? resolveImage(value) : value;

  const selectLocal = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      set(keyName, e.target.value);
    }
  };

  const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(keyName, file);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="block text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0]">
          {label}
        </label>
        {isLocalKey && (
          <span className="text-[9px] text-[#c9a84c] uppercase tracking-wider font-mono">
            Static Asset
          </span>
        )}
      </div>

      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-2 border border-[#3d3d3d] aspect-video bg-[#1a1a1a] flex items-center justify-center relative overflow-hidden">
          {previewSrc ? (
            isVideo ? (
              <video
                src={previewSrc}
                className="w-full h-full object-cover"
                muted
                loop
                autoPlay
                playsInline
              />
            ) : (
              <img src={previewSrc} alt="Preview" className="w-full h-full object-cover" />
            )
          ) : (
            <span className="text-xs text-[#5a5a55] font-mono">No Media</span>
          )}
          {isUploading[keyName] && (
            <div className="absolute inset-0 bg-[#1a1a1a]/80 flex items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin text-[#c9a84c]" />
            </div>
          )}
        </div>

        <div className="col-span-3 space-y-2">
          <input
            value={value}
            onChange={(e) => set(keyName, e.target.value)}
            placeholder="URL or key"
            className="w-full bg-[#1a1a1a] border border-[#3d3d3d] px-3 py-1.5 text-xs text-[#f5f5f0] outline-none"
          />

          <div className="flex gap-2">
            {localPhotos.length > 0 && (
              <div className="flex-1">
                <select
                  onChange={selectLocal}
                  value={isLocalKey ? value : ""}
                  className="w-full bg-[#1a1a1a] border border-[#3d3d3d] px-2 py-1.5 text-xs text-[#f5f5f0] outline-none appearance-none"
                >
                  <option value="">-- Choose local --</option>
                  {localPhotos.map((k) => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="relative">
              <input
                type="file"
                accept="image/*,video/*"
                onChange={selectFile}
                className="hidden"
                id={`file-upload-${keyName.replace(/\./g, "-")}`}
                disabled={isUploading[keyName]}
              />
              <label
                htmlFor={`file-upload-${keyName.replace(/\./g, "-")}`}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 border border-[#3d3d3d] hover:border-[#c9a84c] hover:text-[#c9a84c] text-xs text-[#a8a8a0] transition cursor-pointer select-none"
              >
                {isUploading[keyName] ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
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
