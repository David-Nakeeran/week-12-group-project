/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [new URL("https://media.rawg.io/media/games/**")],
  },
};

export default nextConfig;
