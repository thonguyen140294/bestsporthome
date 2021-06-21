import round from 'lodash/round'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import dayjs from 'dayjs'
import createHmac from 'create-hmac'
import { FULL_DATE_FORMAT } from '~/config/constant'

dayjs.extend(utc)
dayjs.extend(timezone)

export const formatNumber = (value, suffix) => `${Intl.NumberFormat('en-US').format(value)} ${suffix}`
export const numberWithCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
export const roundFloatNumber = (number, precision) => round(number, precision)

export const loadExternalScript = (url, callback) => {
  const script = document.createElement('script')
  script.async = true
  script.src = url
  if (callback) {
    script.addEventListener('load', callback, false)
  }
  if (document) {
    document.body.appendChild(script)
  }
}

export const normalizeDiacriticsString = (str = '') => {
  str = trimWord(str.toLowerCase())
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
  str = str.replace(/đ/g, 'd')
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '') // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, '') // Â, Ê, Ă, Ơ, Ư
  return str
}

export const trimWord = (word = '') => {
  return word.trim().replace(/\s\s+/g, ' ')
}

export const formatDateTimeWithTimezone =
  (dateTime,
    timezone = 'Asia/Ho_Chi_Minh',
    formatDateTime = 'HH:mm DD/MM/YYYY') => {
    return dayjs.utc(dateTime, FULL_DATE_FORMAT).tz(timezone).format(formatDateTime)
  }
// eslint-disable-next-line no-useless-escape,max-len
const botPattern = '(googlebot\\/|bot|Googlebot-Mobile|Googlebot-Image|Google favicon|Mediapartners-Google|bingbot|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon |httrack|webcrawler|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|msrbot|panscient|yacybot|AISearchBot|IOI|ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|spbot|twengabot|postrank|turnitinbot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|blekkobot|ezooms|dotbot|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|Aboundex|domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|gslfbot|aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|blexbot|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|Lipperhey SEO Service|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|Twitterbot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|SemrushBot|yoozBot|lipperhey|y!j-asr|Domain Re-Animator Bot|AddThis)'
const lighthousePattern = '(googlebot\\/|bot|Chrome-Lighthouse)'

export const re = botPattern => new RegExp(botPattern, 'i')
export const isCacheCrawlerAgent = userAgent => re(botPattern).test(userAgent)

export const isBotChromeLighthouse = userAgent => re(lighthousePattern).test(userAgent)

const urlSafeBase64 = string => Buffer.from(string).toString('base64').replace(/=/g, '').replace(/\+/g, '-')
  .replace(/\//g, '_')

const hexDecode = hex => Buffer.from(hex, 'hex')

export const signImgProxy = (salt, target, secret) => {
  const hmac = createHmac('sha256', hexDecode(secret))
  hmac.update(hexDecode(salt))
  hmac.update(target)
  return urlSafeBase64(hmac.digest())
}

export const isValidURL = (str) => {
  const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i') // fragment locator
  return !!pattern.test(str)
}
