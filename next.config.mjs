/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.matichon.co.th',
      },
    ],
  },
}

export default nextConfig
