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
      {
        // Old WordPress-era equivalent of today's merchant/partner page.
        source: '/partner',
        destination: 'https://europan.direct',
        permanent: true,
      },
      {
        source: '/partner/',
        destination: 'https://europan.direct',
        permanent: true,
      },
      // Legacy WordPress URLs still indexed from before this site was rebuilt as
      // Next.js — same cleanup pattern already applied on other migrated PAN21 sites.
      { source: '/wp-content/:path*', destination: '/', permanent: true },
      { source: '/wp-admin/:path*', destination: '/', permanent: true },
      { source: '/wp-login.php', destination: '/', permanent: true },
      { source: '/wp-json/:path*', destination: '/', permanent: true },
      { source: '/sample-page', destination: '/', permanent: true },
      { source: '/sample-page/', destination: '/', permanent: true },
    ]
  },
}
export default nextConfig
