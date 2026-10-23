import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // As ilustrações provisórias são SVG. Ao trocar por fotos (JPG/WebP), isto pode ser removido.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
