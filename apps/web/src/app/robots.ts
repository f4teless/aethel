import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard', '/todos', '/api/'],
    },
    sitemap: 'https://aethel.quest/sitemap.xml', // Replace with your actual domain
  }
} 