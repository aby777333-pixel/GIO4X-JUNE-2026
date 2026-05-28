/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@gio4x/ui", "@gio4x/supabase"],
  images: {
    formats: ["image/webp"],
  },
  // The Netlify build runner treats Next.js lint failures as fatal even
  // when local builds skip lint. We don't have an eslint config in the
  // app, so disable lint-during-build explicitly to avoid CI surprises.
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
