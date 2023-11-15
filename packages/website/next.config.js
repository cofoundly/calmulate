/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['components'],

  // adds support for importing svg's as components
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },

  images: {
    // fixes static export of images
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gravatar.com',
      },
    ],
  },

  // creates a static export when building
  output: 'export',
}

module.exports = nextConfig
