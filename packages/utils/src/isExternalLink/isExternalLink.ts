export const isExternalLink = (url: string) => {
  return (
    url.startsWith('http') ||
    url.startsWith('mailto') ||
    url.startsWith('tel') ||
    url.startsWith('sms') ||
    url.startsWith('intent')
  )
}
