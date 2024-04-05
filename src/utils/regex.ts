export const extractProductIdFromUrl = (url: string) => {
  const regexPattern = /\/(\d+)\.html/

  const match = url.match(regexPattern)

  if (match && match[1]) {
    return match[1]
  }

  return null
}
