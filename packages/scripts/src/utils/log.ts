import consola from 'consola'

const logger = consola

export const log = (message: string, type: 'error' | 'info' | 'success' = 'info'): void => logger[type](message)
