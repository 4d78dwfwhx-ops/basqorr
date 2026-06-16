/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['ar', 'en'],
    defaultLocale: 'ar',
    localeDetection: false,
    domains: [
      {
        domain: 'basqor.sa',
        defaultLocale: 'ar',
      },
      {
        domain: 'en.basqor.sa',
        defaultLocale: 'en',
      },
    ],
  },
  images: {
    domains: [
      'res.cloudinary.com',
      'storage.googleapis.com',
      'basqor-storage.s3.amazonaws.com',
    ],
    minimumCacheTTL: 60,
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    serverActions: true,
  },
  output: 'standalone',
  transpilePackages: ['@prisma/client'],
};

module.exports = nextConfig;
