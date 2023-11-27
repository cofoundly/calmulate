import constants from '../constants.json'

export const getDynamicNavItems = () => {
  return constants.sections
    .filter(section => section.navTitle)
    .map(section => ({
      name: section.navTitle || '',
      href: `#${section.navTitle}`,
    }))
}
