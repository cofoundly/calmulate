export const formatBillingInterval = (value: string): string => {
  switch (value) {
    case 'day':
      return 'Daily'
    case 'week':
      return 'Weekly'
    case 'month':
      return 'Monthly'
    case 'year':
      return 'Yearly'
    default:
      return ''
  }
}
