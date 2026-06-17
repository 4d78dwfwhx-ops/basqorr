/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '/basqorr',
  assetPrefix: '/basqorr',
  trailingSlash: true,
};
export default nextConfig;
