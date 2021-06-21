import { signImgProxy } from '../helper/index.js'

const DEFAULT_PATH = '/auto/$width/0/sm/0/plain/$url@$format'

export function getImage (src, { modifiers } = {}, { nuxtContext: { env } }) {
  const {
    width, format
  } = modifiers
  const {
    IMG_BASE, IMGPROXY_URL, IMGPROXY_SALT, IMGPROXY_KEY
  } = env

  let url = src

  if (!src.includes('http')) {
    url = IMG_BASE + src
  }
  const path = DEFAULT_PATH.replace('$width', width)
    .replace('$url', url)
    .replace('$format', format)
  const signature = signImgProxy(IMGPROXY_SALT, path, IMGPROXY_KEY)

  return {
    url: IMGPROXY_URL + signature + path
  }
}
