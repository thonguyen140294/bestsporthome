import { isCurrentBetweenStartAndEnd } from '../helper/maintenance-utils'
import { IFRAME_GAME_URLS } from '../config/page-url'

export default ({ app }) => {
  const maintenance = app.$cookies.get('maintenance_data', { parseJSON: true })

  if (maintenance && isCurrentBetweenStartAndEnd(
    maintenance.start_time,
    maintenance.end_time
  )) {
    const blockLinks = [
      IFRAME_GAME_URLS.LIVE_SPORTS,
      IFRAME_GAME_URLS.ESPORTS,
      IFRAME_GAME_URLS.VIRTUAL_SPORTS,
      IFRAME_GAME_URLS.KENO,
      IFRAME_GAME_URLS.LOTTERY,
      IFRAME_GAME_URLS.NUMBER_GAME,
      IFRAME_GAME_URLS.SABA_CLUB,
      IFRAME_GAME_URLS.TABLE_GAMES,
      IFRAME_GAME_URLS.VIRTUAL_GAME
    ]

    app.router.beforeEach((to, from, next) => {
      if (to.fullPath.startsWith('/account') || blockLinks.includes(to.fullPath)) {
        next({ path: '/' })
        app.store.commit('maintenance/setShowMaintenance', true)
      } else {
        next()
      }
    })
  }

  const currentUser = app.$cookies.get('currentUser', { parseJSON: true })

  // Check if user have package, will block user to enter some games by url
  if (currentUser && currentUser.package_id) {
    const planType = {
      commission: 1,
      welcome: 2,
      first_50: 3,
      promotion: 4,
      saturday: 5,
      bonus: 6
    }
    const blockType = [
      planType.welcome,
      planType.first_50,
      planType.promotion,
      planType.saturday
    ]
    const blockList = [
      '/lottery-cyber-punk',
      '/lottery-las-vegas'
    ]

    app.router.beforeEach((to, from, next) => {
      if (
        blockType.includes(currentUser.package_id) &&
        (to.fullPath.startsWith('/casino') || blockList.includes(to.fullPath))
      ) {
        next({ path: '/' })
      } else {
        next()
      }
    })
  }
}
