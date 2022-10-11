/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['upload.wikimedia.org'],
    // formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig
