export function getSiteMapProd () {
  return {
    hostname: process.env.DOMAIN,
    sitemaps: [
      {
        path: '/sitemap.xml',
        sitemaps: [
          {
            path: '/sitemap-general.xml',
            routes: [
              '/',
            ],
            exclude: ['/**']
          }
        ]
      }
    ],
    cacheTime: 1000 * 60
  }
}
