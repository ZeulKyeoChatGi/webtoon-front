const withImages = require('next-images');

const withSass = require('@zeit/next-sass');
module.exports = withSass({
  cssModules: true
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { webpack }) => {
    // const prod = process.env.NODE_ENV === 'production';
    const prod = false
    const newConfig = {
      ...config,
      mode: prod ? 'production' : 'development',
    };
    if (prod) {
      newConfig.devtool = 'hidden-source-map';
    }
    return newConfig;
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `http://192.168.0.9:8080/:path*`,
      },
    ];
  },
};

module.exports = withImages(nextConfig)
