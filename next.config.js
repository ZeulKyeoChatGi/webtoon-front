const withImages = require('next-images');

const withSass = require('@zeit/next-sass');
module.exports = withSass({
  cssModules: true
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true
}

module.exports = withImages(nextConfig)
