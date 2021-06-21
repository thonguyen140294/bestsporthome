import { IFRAME_GAME_URLS } from '~/config/page-url'

export const SPORTS = [
  {
    url: IFRAME_GAME_URLS.LIVE_SPORTS,
    image: '/assets/images/components/lobby/sport-item/live-sports.jpg',
    imageMobile: '/assets/images/components/lobby/sport-item/live-sports-sp.jpg',
    title: 'SPORTS',
    description: 'Tỷ lệ kèo cực cao, tốc độ cực nhanh, hoàn trả siêu hấp dẫn tới 1.25%.',
    loginRequired: false,
    newTab: false
  },
  {
    url: IFRAME_GAME_URLS.VIRTUAL_SPORTS,
    image: '/assets/images/components/lobby/sport-item/virtual-sports.jpg',
    imageMobile: '/assets/images/components/lobby/sport-item/virtual-sports-sp.jpg',
    title: 'VIRTUAL SPORTS',
    description: 'Tỷ lệ cạnh tranh, tốc độ nhanh, đa dạng trò chơi: bóng đá, bóng rổ, tennis ...',
    loginRequired: true,
    newTab: false
  },
  {
    url: IFRAME_GAME_URLS.ESPORTS,
    image: '/assets/images/components/lobby/sport-item/e-sports.jpg',
    imageMobile: '/assets/images/components/lobby/sport-item/e-sports-sp.jpg',
    title: 'E-SPORTS',
    description: 'Siêu hấp dẫn, quy tụ các giải đấu e-Sports hàng đầu: LOL, PUBG, FIFA ...',
    loginRequired: true,
    newTab: false
  }
]
