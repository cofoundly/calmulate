import dayjs from 'dayjs'

export const getISOString = (time?: number) => dayjs(time).toISOString()
