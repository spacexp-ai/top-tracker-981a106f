import { createClient, OAuthStrategy } from "@wix/sdk";
import { items } from "@wix/data";

const wixClientId = import.meta.env.VITE_WIX_CLIENT_ID || "";

if (!wixClientId) {
  console.warn("Wix Headless CMS Client ID (VITE_WIX_CLIENT_ID) is not set. Falling back to default site content.");
}

export const wixClient = wixClientId
  ? createClient({
      modules: { items },
      auth: OAuthStrategy({
        clientId: wixClientId,
      }),
    })
  : null;
