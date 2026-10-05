import type { MetadataRoute } from 'next'

const BASE_URL = 'https://www.europan.group'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE_URL}/`, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/buy`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/faq`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/de/internet-stadt`, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${BASE_URL}/impressum`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE_URL}/datenschutz`, changeFrequency: 'yearly', priority: 0.2 },
  ]
}
