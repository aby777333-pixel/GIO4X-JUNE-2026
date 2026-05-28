/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@gio4x/ui", "@gio4x/supabase"],
  images: {
    formats: ["image/webp"],
  },
};

export default nextConfig;
