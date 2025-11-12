import BuilderDevTools from "@builder.io/dev-tools/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = BuilderDevTools()({
  /* config options here */
  reactCompiler: true,
  // Add empty turbopack config to silence the warning
  turbopack: {},
});

export default nextConfig;
