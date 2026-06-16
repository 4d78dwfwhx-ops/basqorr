cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'basqor-storage.s3.amazonaws.com',
      },
    ],
    minimumCacheTTL: 60,
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'basqor.sa', 'en.basqor.sa'],
    },
  },
  transpilePackages: ['@prisma/client'],
  // ملاحظة: لا تستخدم output: 'export' مع Prisma و Supabase
  // لأنها تحتاج server-side features
};

module.exports = nextConfig;
EOF

git add next.config.js
git commit -m "fix: resolve duplicate nextConfig declaration"
git push origin main
