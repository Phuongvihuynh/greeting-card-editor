import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // Konva requires canvas on the server side, but we only use it client-side
    if (isServer) {
      config.externals = [...(config.externals || []), { canvas: "canvas" }];
    }
    return config;
  },
};

export default nextConfig;
