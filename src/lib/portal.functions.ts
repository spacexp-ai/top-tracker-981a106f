import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const getDashboard = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const [{ data: profile }, { data: roles }, { data: bookings }] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
      supabase.from("user_roles").select("role").eq("user_id", userId),
      supabase
        .from("bookings")
        .select("*, species(name,emoji), professional_hunters(name)")
        .eq("user_id", userId)
        .order("updated_at", { ascending: false })
        .limit(10),
    ]);
    return {
      profile,
      roles: roles ?? [],
      bookings: bookings ?? [],
      debug: {
        url: process.env.SUPABASE_URL || "not set",
        userId,
        projectId: process.env.SUPABASE_PROJECT_ID || "not set",
      },
    };
  });

export const getCatalog = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase } = context;
    const [{ data: species }, { data: phs }] = await Promise.all([
      supabase.from("species").select("*").order("base_price_usd", { ascending: false }),
      supabase.from("professional_hunters").select("*").eq("active", true),
    ]);
    return { species: species ?? [], phs: phs ?? [] };
  });

const bookingSchema = z.object({
  id: z.string().uuid().optional(),
  species_id: z.string().uuid().nullable().optional(),
  ph_id: z.string().uuid().nullable().optional(),
  start_date: z.string().nullable().optional(),
  end_date: z.string().nullable().optional(),
  party_size: z.number().int().min(1).max(8).optional(),
  camp_tier: z.string().max(40).nullable().optional(),
  kit: z.any().optional(),
  notes: z.string().max(2000).nullable().optional(),
  total_estimate_usd: z.number().int().nullable().optional(),
  current_step: z.number().int().min(1).max(6).optional(),
  status: z.enum(["draft", "submitted"]).optional(),
});

export const saveBooking = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => bookingSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const payload = { ...data, user_id: userId };
    if (data.id) {
      const { data: row, error } = await supabase
        .from("bookings")
        .update(payload)
        .eq("id", data.id)
        .eq("user_id", userId)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return row;
    }
    const { data: row, error } = await supabase.from("bookings").insert(payload).select().single();
    if (error) throw new Error(error.message);
    return row;
  });

// --- MOCK COMMUNITY DATA ---
const MOCK_PROFILES = [
  {
    id: "uuid-1",
    name: "Alistair Sterling",
    tier: "Tracker Tier+",
    joined: "2024-03-12",
    bio: "Based in London, traveling the world. I believe tracking is the ultimate form of meditation. Seeking the toughest terrain and the oldest bulls.",
    favorite_quarry: "Cape Buffalo",
    avatar: "/images/avatar-placeholder.jpg",
    trophies: [
      { id: 1, species: "Cape Buffalo", emoji: "🐃", location: "Tanzania", date: "2025-08-14" },
      { id: 2, species: "Greater Kudu", emoji: "🦌", location: "South Africa", date: "2024-11-02" },
    ],
    social: { instagram: "@ast_tracks" },
  },
  {
    id: "uuid-2",
    name: "Elena Rostova",
    tier: "Pathfinder Tier",
    joined: "2025-01-05",
    bio: "Conservationist and ethical tracker. I focus on older, past-prime males to fund anti-poaching initiatives.",
    favorite_quarry: "Lion",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    trophies: [
      { id: 3, species: "Plains Zebra", emoji: "🦓", location: "Namibia", date: "2026-02-10" },
    ],
    social: { website: "elenarostova.com" },
  },
  {
    id: "uuid-3",
    name: "Marcus Vance",
    tier: "Observer",
    joined: "2026-05-20",
    bio: "Getting ready for my first expedition in Tanzania. Looking for advice on optics and boots!",
    favorite_quarry: "Leopard",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    trophies: [],
    social: {},
  },
];

export const getCommunityDirectory = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async () => {
    return MOCK_PROFILES;
  });

export const getCommunityProfile = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((id: string) => z.string().parse(id))
  .handler(async ({ data: id }) => {
    const profile = MOCK_PROFILES.find((p) => p.id === id);
    if (!profile) throw new Error("Profile not found");
    return profile;
  });
