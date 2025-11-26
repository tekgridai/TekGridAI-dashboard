/** @type {import('next').NextConfig} */
const nextConfig = {
  // Typescript settings
  typescript: {
    ignoreBuildErrors: true, // allow builds even with TS errors
  },

  // Next.js build/output settings
  output: "export",          // static export
  trailingSlash: true,       // optional, add trailing slashes to routes

  // ESLint settings
  eslint: {
    ignoreDuringBuilds: true, // skip ESLint during build
  },

  // Image settings
  images: {
    unoptimized: true,       // disables Next.js image optimization
  },
};

export default nextConfig;
