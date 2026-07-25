import { createMDX } from 'fumadocs-mdx/next';

/** @type {import("next").NextConfig} */
const nextConfig = {
  devIndicators: false,
  // Docs live at the root now; gracefully redirect any old /docs/* links.
  async redirects() {
    return [
      { source: '/docs', destination: '/', permanent: true },
      { source: '/docs/:path*', destination: '/:path*', permanent: true },
    ];
  },
};

const withMDX = createMDX();

export default withMDX(nextConfig);
