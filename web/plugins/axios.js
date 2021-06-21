import { cacheAdapterEnhancer } from 'axios-extensions'
import LRU from 'lru-cache'
const ONE_HOUR = 1000 * 60 * 60

export default ({ $axios, ssrContext, $ua, store, redirect }) => {
  const defaults = $axios.defaults
  const defaultCache = process.server
    ? ssrContext.$axCache
    : new LRU({ maxAge: ONE_HOUR })
  defaults.adapter = cacheAdapterEnhancer(defaults.adapter, {
    enabledByDefault: false,
    cacheFlag: 'useCache',
    defaultCache
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401) {
      store.dispatch('socketUnSubscribeWallet')
      store.commit('resetStore')
      redirect('/')
    }
  })

  $axios.setHeader('os', $ua.os())
  $axios.setHeader('device', $ua.deviceType())
  $axios.setHeader('browser', $ua.browser())

  $axios.interceptors.request.use((request) => {
    const token = store.state.currentUser && store.state.currentUser.token
    const gptoken = store.state.currentUser && store.state.currentUser.gptoken

    if (token) {
      request.headers.common.token = token
    }
    if (token) {
      request.headers.common.gptoken = gptoken
    }
    return request
  })
}
