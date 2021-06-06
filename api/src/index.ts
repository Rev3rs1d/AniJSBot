import 'reflect-metadata'
import './database'

import express from 'express'
import routes from './routes'
import env from './env'

const PORT = env.PORT || 666
const app = express()

app.use(express.json())
app.use(routes)

app.get('/', (_, res) => {
  res.json({
    message:
      'Esta é uma API para o dashboard do @AniJSBot. Veja a documentação dela em: https://github.com/Lewizh11/AniJsBot',
  })
})

app.listen(PORT, () => console.log('Server listen: ', PORT))
