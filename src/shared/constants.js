/* eslint-disable */
const protocol = 'https'
const domainName = 'smarter.sh'
const URL_CDN = protocol + '://cdn.' + domainName
const URL_SITE = protocol + '://' + domainName

export const APP_CONFIG = {
  debug: false,
  static: {
    images: {
      default: 'https://smarter.sh/wp-content/uploads/2024/04/Smarter_crop.png',
    },
  },
  schema: {
    me: URL_SITE + '/#me',
  },
  urls: {
    cdn: URL_CDN,
    site: URL_SITE,
  },
}
