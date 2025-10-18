/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: '/education-2045',
  assetPrefix: '/education-2045/',
}

module.exports = nextConfig