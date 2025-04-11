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
        destination: 
          process.env.NODE_ENV === 'production'
            ? `${process.env.BACKEND_URL}/api/:path*`
            : 'http://localhost:8000/api/:path*',
      },
    ];
  },
};

export default nextConfig;
