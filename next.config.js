/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'edamam-product-images.s3.amazonaws.com',
      'i.ytimg.com',
      'firebasestorage.googleapis.com',
    ],
  },
}

module.exports = nextConfig
