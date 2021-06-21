import axios from 'axios'
const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 15000,
  headers: {
    os: 'Linux',
    device: 'pc',
    browser: 'Chrome'
  }
})
export function getSiteMapProd () {
  return {
    hostname: process.env.MU_DOMAIN,
    sitemaps: [
      {
        path: '/sitemap.xml',
        sitemaps: [
          {
            path: '/sitemap-general.xml',
            routes: [
              '/',
              '/account',
              '/casino',
              '/esports',
              '/faq',
              '/keno',
              '/live-casino',
              '/live-sports',
              '/lo-de-sieu-toc',
              '/lode',
              '/lottery',
              '/lottery-las-vegas',
              '/numbergame',
              '/play-sport-game',
              '/tablegame',
              '/tp-numbergame',
              '/tin-tuc',
              '/ve-chung-toi',
              '/ve-chung-toi?tab=chinh-sach-bao-mat',
              '/ve-chung-toi?tab=dieu-khoan-dieu-kien',
              '/ve-chung-toi?tab=khuyen-mai',
              '/ve-chung-toi?tab=phuong-thuc-thanh-toan'
            ],
            exclude: ['/**']
          },
          {
            path: '/sitemap-categories.xml',
            cacheTime: 1000 * 60,
            routes: async () => {
              try {
                const { data: response } = await axiosInstance.get('/news/news-categories')
                if (response.status === 'OK' && response.data.length !== 0) {
                  return response.data.map(category => ({
                    url: `/${category.slug}`,
                    changefreq: 'weekly',
                    priority: 0.8,
                    lastmodrealtime: true
                  }))
                }
                return []
              } catch (e) {
                console.error(e)
              }
            },
            exclude: ['/**']
          },
          {
            path: '/sitemap-news.xml',
            cacheTime: 1000 * 60,
            routes: async () => {
              try {
                const { data: response } = await axiosInstance.get('news/posts', {
                  params: {
                    limit: 100
                  }
                })
                if (response.status === 'OK' && response.data.length !== 0) {
                  return response.data.map(post => ({
                    url: `tin-tuc/${post.slug}`,
                    changefreq: 'daily',
                    priority: 0.8,
                    lastmod: post.updated_date,
                    lastmodrealtime: true
                  }))
                }
                return []
              } catch (e) {
                console.error(e)
              }
            },
            exclude: ['/**']
          }
        ]
      }
    ],
    cacheTime: 1000 * 60
  }
}
