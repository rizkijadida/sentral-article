/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
        // pathname: "/**", // Mengizinkan semua path
      },
    ],
  },
};

export default nextConfig;
