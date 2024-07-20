/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    reactCompiler: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
      }
    ],
  },  
 async rewrites() {
    return [
      {
        source: '/.netlify/functions/:path*',
        destination: 
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:8888/.netlify/functions/:path*'
            : '/.netlify/functions/:path*',
      },
    ];
  },
};

export default nextConfig;
