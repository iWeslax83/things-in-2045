/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: '/things-in-2045',
  assetPrefix: '/things-in-2045/',
}

module.exports = nextConfig