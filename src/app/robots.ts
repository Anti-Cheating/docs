import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://docs.trueyy.com/sitemap.xml',
    host: 'https://docs.trueyy.com',
  };
}
