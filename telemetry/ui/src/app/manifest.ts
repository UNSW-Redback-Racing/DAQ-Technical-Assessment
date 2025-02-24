import type { MetadataRoute } from "next";

/**
 * Generates the web app manifest for the application.
 * 
 * @returns {MetadataRoute.Manifest} The web app manifest object.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    theme_color: "#0A0A0A",
    background_color: "#000000",
    icons: [
      {
        purpose: "maskable",
        sizes: "512x512",
        src: "icon512_maskable.png",
        type: "image/png",
      },
      {
        purpose: "any",
        sizes: "512x512",
        src: "icon512_rounded.png",
        type: "image/png",
      },
    ],
    orientation: "any",
    display: "standalone",
    dir: "auto",
    lang: "en-US",
    name: "Spyder",
    short_name: "Spyder",
    start_url: "/",
    scope: "/",
  };
}
