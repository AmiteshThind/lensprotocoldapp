/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    CLIENT_ID: process.env.CLIENT_ID,
    NEXT_PUBLIC_STUDIO_API_KEY: process.env.NEXT_PUBLIC_STUDIO_API_KEY,
  },
  transpilePackages: ["@lens-protocol"],
  async redirects() {
    return [
      {
        source: "/",
        destination: "/landing",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
