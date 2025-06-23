/** @type {import('next').NextConfig} */
import nextPWA from 'next-pwa';

// Configure next-pwa
const withPWA = nextPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development', // Disable PWA features in development
});

// Next.js configuration
export default withPWA({
  reactStrictMode: true,
  output: 'standalone',
});
