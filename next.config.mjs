/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sixxmrmgffvhhcbjbnwu.supabase.co',
        // pathname: '**',
        pathname: '/storage/v1/object/public/main-images/**',
      },
      {
        protocol: 'https',
        hostname: 'sixxmrmgffvhhcbjbnwu.supabase.co',
        pathname: '/storage/v1/object/public/track-images/**',
      },
      {
        protocol: 'https',
        hostname: 'sixxmrmgffvhhcbjbnwu.supabase.co',
        pathname: '/storage/v1/object/public/projects-images/**',
      },
    ],
  },
};

export default nextConfig;
