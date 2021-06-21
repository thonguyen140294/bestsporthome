export default ({
  store, app, route
}, inject) => {
  const getRoute = clientRoute => clientRoute || route || {
    name: '',
    params: {
      slug: ''
    },
    fullPath: ''
  }

  inject('getRoute', getRoute)
}
