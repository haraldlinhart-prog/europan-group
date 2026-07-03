/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  async redirects() {
    return [
      {
        source: '/merchants',
        destination: 'https://europan.direct',
        permanent: true,
      },
    ]
  },
}
export default nextConfig
