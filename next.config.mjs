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
  // This rewrites configuration redirects all API requests to your backend server
  // When a request is made to /api/something, it gets rewritten to:
  // https://13.61.212.73/api/something (or whatever is in NEXT_PUBLIC_BACKEND_URL)
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_BACKEND_URL || 'https://13.61.212.73'}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
