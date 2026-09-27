/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Every host passed to next/image must be listed here, or the optimizer
    // rejects it with a 400 and the <img> renders empty. i.pravatar.cc is the
    // review/author avatar host (reviews.ts, blog, live) and was missing, so
    // every avatar on /blog 400'd.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "i.pravatar.cc" },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

module.exports = nextConfig;
