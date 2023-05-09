/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.discordapp.com', 'tps://m.stripe.network'],
  },
}

module.exports = nextConfig
