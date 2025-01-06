/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
       domains: ['assets-global.website-files.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.website-files.com',
      },
    ],
  },
};

export default nextConfig;
