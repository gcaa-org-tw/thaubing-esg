export function getZhTags (tagList, tagMeta) {
  return tagList.map((tag) => {
    const target = tagMeta.find(meta => meta.tagEn === tag)
    if (target) {
      return target.tagZh
    }
    return tag
  })
}
