/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'offlineCache',
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 24 * 60 * 60 // 24 hours
        }
      }
    }
  ]
});

const nextConfig = {
  // Configuração dinâmica baseada no ambiente
  // Só usa basePath/assetPrefix se for GitHub Pages
  ...(process.env.NODE_ENV === 'production' && process.env.GITHUB_PAGES ? {
    output: 'export',
    basePath: '/Mae-Conectada-sempre-empoderada',
    assetPrefix: '/Mae-Conectada-sempre-empoderada/',
    trailingSlash: true,
  } : {
    // Para Vercel/Netlify/mobile, tudo na raiz
    basePath: '',
    assetPrefix: '',
    trailingSlash: false,
  }),
  images: {
    unoptimized: true,
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },
  // Otimizações para mobile
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // PWA e Acessibilidade
  poweredByHeader: false,
  reactStrictMode: true,
};

module.exports = withPWA(nextConfig);