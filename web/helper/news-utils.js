export const getParentSlug = (link, slug) => {
  try {
    const parentSlugRegexStr = `[^\\/]*(?=\\/${slug})`
    const parentSlugRegexMatch = link.replace('/category/news/', '').match(new RegExp(parentSlugRegexStr, 'g'))
    return parentSlugRegexMatch[0]
  } catch (e) {
    return null
  }
}
