import { app } from './app'
import { Env } from './globals/env'
import { globalRouter } from './globals/globalRouter'
import { logger } from './globals/logger'

app.use(globalRouter)

app.listen(Env.PORT, () => {
  logger.info(`Server is running on http://localhost:${Env.PORT}`)
})