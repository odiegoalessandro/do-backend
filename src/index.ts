import { app } from './app'
import { Env } from './globals/env'
import { logger } from './globals/logger'

app.get('/heartbeat', (req, res) => {
  res.status(200).send({
    status: 'ok'
  })
})

app.listen(Env.PORT, () => {
  logger.info(`Server is running on http://localhost:${Env.PORT}`)
})