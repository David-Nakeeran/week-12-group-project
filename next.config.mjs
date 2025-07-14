/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [new URL("https://media.rawg.io/media/**")],
  },
};

export default nextConfig;
