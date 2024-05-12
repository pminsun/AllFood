/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["edamam-product-images.s3.amazonaws.com", "i.ytimg.com"],
  },
};

module.exports = nextConfig;
