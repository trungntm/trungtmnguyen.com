import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import { getAllSeries } from '@/utils/series'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl

  const blogRoutes = allBlogs
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}`,
      lastModified: post.lastmod || post.date,
    }))

  const seriesRoutes = getAllSeries()
    .filter((series) => series.slug && series.slug.length > 0)
    .map((series) => ({
      url: `${siteUrl}/series/${series.slug}`,
      lastModified: new Date().toISOString().split('T')[0],
    }))

  const routes = ['', 'blog', 'projects', 'tags', 'series'].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogRoutes, ...seriesRoutes]
}
