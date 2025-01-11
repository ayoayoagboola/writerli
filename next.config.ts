/** @type {import('next').NextConfig} */

// added hostname to images.remotePatterns

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/*/**",
      },
      {
        protocol: "https",
        hostname: "fvfrsliskgekptlghmir.supabase.co",
        port: "",
        pathname: "/*/**",
      },
    ],
  },
};

module.exports = nextConfig;
