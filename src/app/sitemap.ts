import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';

const BASE = 'https://docs.trueyy.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return source.getPages().map((page) => ({
    url: `${BASE}${page.url}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: page.url === '/' ? 1 : 0.7,
  }));
}
