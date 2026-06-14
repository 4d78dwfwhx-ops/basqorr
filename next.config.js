/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["*.preview.same-app.com"],
  images: {
    unoptimized: true,
    domains: [
      "source.unsplash.com",
      "images.unsplash.com",
      "ext.same-assets.com",
      "ugc.same-assets.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ext.same-assets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ugc.same-assets.com",
        pathname: "/**",
      },
    ],
  },
  i18n: {
    locales: ['ar', 'en'],
    defaultLocale: 'ar',
    localeDetection: true,
  },
  experimental: {
    appDir: true,
  },
  // next-intl and next-seo can be configured in their respective config files,
  // but for next-seo, you can add a default config here if needed.
  // For example:
  // nextSeo: {
  //   titleTemplate: "%s | MyApp",
  //   defaultTitle: "MyApp",
  //   openGraph: {
  //     type: 'website',
  //     locale: 'ar_AR',
  //     url: 'https://www.example.com/',
  //     site_name: 'MyApp',
  //   },
  // },
};

module.exports = nextConfig;
