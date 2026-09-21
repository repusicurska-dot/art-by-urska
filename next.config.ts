import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 92 is the painted sky behind every page (SkyBackdrop). Next.js only serves the qualities
    // listed here — without it the sky silently fell back to 75 and looked soft.
    qualities: [75, 92],
  },
};

export default nextConfig;
