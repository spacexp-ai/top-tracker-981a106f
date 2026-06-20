import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { wixClient } from "@/lib/wix";
import { photos, type PhotoKey } from "@/assets/photos";

// Custom hook to fetch site content from Wix CMS
export function useSiteContent() {
  return useQuery({
    queryKey: ["site_content"],
    queryFn: async () => {
      if (!wixClient) {
        return {};
      }

      try {
        const response = await wixClient.items
          .query("SiteContent")
          .limit(100)
          .find();

        const contentMap: Record<string, any> = {};
        if (response.items) {
          response.items.forEach((item) => {
            const data = item.data || {};
            if (data.key && data.value !== undefined) {
              contentMap[data.key] = data.value;
            }
          });
        }
        return contentMap;
      } catch (error) {
        console.error("Error fetching site content from Wix Headless CMS:", error);
        return {}; // Fallback gracefully to standard site content
      }
    },
    // Keep cached for a long time to prevent redundant lookups
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

// Custom hook to save site content to Wix CMS
export function useSaveSiteContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (itemsList: { key: string; value: any }[]) => {
      if (!wixClient) {
        console.warn("Wix client not initialized. Cannot save changes.");
        return;
      }

      for (const item of itemsList) {
        try {
          // Query to see if the item already exists in the 'SiteContent' collection
          const existing = await wixClient.items
            .query("SiteContent")
            .eq("key", item.key)
            .find();

          if (existing.items && existing.items.length > 0) {
            // Update the existing item
            const existingItem = existing.items[0];
            await wixClient.items.update("SiteContent", {
              _id: existingItem._id,
              data: {
                key: item.key,
                value: item.value,
              },
            });
          } else {
            // Insert a new item
            await wixClient.items.insert("SiteContent", {
              data: {
                key: item.key,
                value: item.value,
              },
            });
          }
        } catch (error) {
          console.error(`Error saving key ${item.key} to Wix CMS:`, error);
          throw error;
        }
      }
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
