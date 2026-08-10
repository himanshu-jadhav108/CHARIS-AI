import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://charis.ai';

  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/catalog', '/consult', '/messages', '/auth'],
      disallow: ['/dashboard', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
