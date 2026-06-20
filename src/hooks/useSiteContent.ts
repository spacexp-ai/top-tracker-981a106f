import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { photos, type PhotoKey } from "@/assets/photos";

export interface SiteContentItem {
  key: string;
  value: any;
}

// Custom hook to fetch site content
export function useSiteContent() {
  return useQuery({
    queryKey: ["site_content"],
    queryFn: async () => {
      const { data, error } = await (supabase as any).from("site_content").select("key, value");

      if (error) {
        console.error("Error fetching site content:", error);
        throw error;
      }

      const contentMap: Record<string, any> = {};
      if (data) {
        data.forEach((row: { key: string; value: any }) => {
          contentMap[row.key] = row.value;
        });
      }
      return contentMap;
    },
    // Keep cached for a long time to prevent redundant lookups
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

// Custom hook to save site content
export function useSaveSiteContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (items: SiteContentItem[]) => {
      const { data, error } = await (supabase as any)
        .from("site_content")
        .upsert(items, { onConflict: "key" });

      if (error) {
        console.error("Error upserting site content:", error);
        throw error;
      }
      return data;
    },
    onSuccess: () => {
      // Invalidate the cache to trigger refetching
      queryClient.invalidateQueries({ queryKey: ["site_content"] });
    },
  });
}

// Utility to resolve image URLs: if the value is a key in our photos asset manifest,
// return the local imported image asset path; otherwise return the string directly.
export function resolveImage(url: string | null | undefined): string {
  if (!url) return "";
  if (url in photos) {
    return photos[url as PhotoKey];
  }
  return url;
}
