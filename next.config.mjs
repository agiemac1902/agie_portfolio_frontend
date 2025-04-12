/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', '13.61.212.73'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://13.61.212.73'}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
