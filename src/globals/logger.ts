import pino from 'pino'
import { Env } from './env'

const isLocal = Env.isLocal

export const logger = pino({
  level: isLocal ? 'debug' : 'info',
  base: {
    env: Env.ENVIRONMENT_NAME,
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  formatters: {
    level(label) {
      return { level: label }
    },
  },
  transport: isLocal
    ? {
        target: 'pino-pretty',
        options: {
          translateTime: 'UTC:HH:mm:ss',
          ignore: 'pid,hostname',
        },
      }
    : undefined,
})
