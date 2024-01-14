/** @type {import('next').NextConfig} */
const path = require('path')
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')

const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: path.join(__dirname, 'node_modules/tinymce'),
            to: path.join(__dirname, 'public/assets/libs/tinymce')
          }
        ]
      })
    )
    return config
  },
  webpackDevMiddleware: config => {
    return config
  },
  reactStrictMode: true,
}

module.exports = nextConfig
