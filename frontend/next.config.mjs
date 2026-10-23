/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'admin.abeautynfashion.com',
      },
      {
        protocol: 'https',
        hostname: 'www.abeautynfashion.com',
      },
      {
        protocol: 'https',
        hostname: 'abeautynfashion.com',
      },
    ],
  },
};

export default nextConfig;
