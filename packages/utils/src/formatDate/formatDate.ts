import dayjs from 'dayjs'

export const formatDate = (date: dayjs.ConfigType) => dayjs(date).format('DD MMMM YYYY')
