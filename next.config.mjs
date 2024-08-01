/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.laikaa.in',
        port: '',
        pathname: 'backend/assets/brand_logos/**',
      },
    ],
  },
};

export default nextConfig;
