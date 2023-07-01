/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_BASE_URL:
      'https://corsproxy.io/?https%3A%2F%2Fwww.freetogame.com%2Fapi',
  },
  images: {
    domains: ['www.freetogame.com'],
  },
};

module.exports = nextConfig;
