// import { cleanMarkdown } from './markdownUtils'

const TITLE_TAIL = 'ESG 檢測儀：我們與永續轉型的距離'

export function genMeta (name, content) {
  const nameAttr = name.startsWith('og:') ? 'property' : 'name'
  return {
    hid: name,
    [nameAttr]: name,
    content
  }
}

// all three attribute can be either static string or callback that use vue instance as this
export function friendlyHeader ({ title, description, coverUrl }) {
  const SITE_URL = process.env.SITE_URL || 'https://gcaa-org-tw.github.io/thaubing-esg'

  function getContentAtBest (sth) {
    if (typeof sth === 'string') {
      return sth
    } else if (typeof sth === 'function') {
      return sth.call(this)
    } else {
      return sth.toString()
    }
  }

  // return a head function
  return function () {
    const getContentWithThis = getContentAtBest.bind(this)
    const head = { meta: [] }

    // always set title, so we get correct tag
    title = title || ''
    const prefix = `${getContentWithThis(title)}`
    const titleStr = prefix ? `${prefix} | ${TITLE_TAIL}` : TITLE_TAIL

    head.title = titleStr
    head.meta.push(genMeta('og:title', titleStr))
    head.meta.push(genMeta('twitter:title', titleStr))

    if (description) {
      const despStr = getContentWithThis(description)
      head.meta.push(genMeta('description', despStr))
      head.meta.push(genMeta('og:description', despStr))
      head.meta.push(genMeta('twitter:description', despStr))
    }
    if (coverUrl) {
      let coverUrlStr = getContentWithThis(coverUrl)
      if (coverUrlStr) {
        if (coverUrlStr.startsWith('/')) {
          coverUrlStr = `${SITE_URL}${coverUrlStr}`
        } else if (!coverUrlStr.startsWith('http')) {
          coverUrlStr = `${SITE_URL}/${coverUrlStr}`
        }
        head.meta.push(genMeta('og:image', coverUrlStr))
        head.meta.push(genMeta('twitter:image', coverUrlStr))
        head.meta.push(genMeta('twitter:card', 'summary_large_image'))
      }
    }
    // if we are in page, so have access to vue instance
    if (this && (title || description || coverUrl)) {
      const url = `${SITE_URL}${this.$route.path}`
      head.meta.push(genMeta('og:url', url))
    }
    return head
  }
}
