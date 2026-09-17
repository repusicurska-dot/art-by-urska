import type { MetadataRoute } from "next";

/**
 * Makes the site installable as "Spirituality by Urška": "Add to Home Screen" on iPhone and
 * "Install app" on Android open it full-screen on the Spirituality page with its own icon, like
 * an app, instead of a browser tab.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Spirituality by Urška",
    short_name: "Spirituality",
    description: "Tarot card of the day, the moon, a minute of stillness and the Star Business Calendar — by Urška.",
    start_url: "/spirituality?source=app",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#fbf7f0",
    theme_color: "#030303",
    lang: "sl",
    categories: ["lifestyle", "health", "entertainment"],
    icons: [
      { src: "/app-icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/app-icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/app-icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Zvezdni poslovni koledar", short_name: "Koledar", url: "/zvezdni-koledar/moj", icons: [{ src: "/app-icons/icon-192.png", sizes: "192x192" }] },
      { name: "Spirituality", short_name: "Tarot", url: "/spirituality", icons: [{ src: "/app-icons/icon-192.png", sizes: "192x192" }] },
    ],
  };
}
