import 'reflect-metadata'
import './database'

import express from 'express'
import routesUsers from './routes/routesUsers'
import routesAnimes from './routes/routesAnimes'
import env from './env'

const PORT = env.PORT || 666
const app = express()

app.use(express.json())

// adding routes
app.use(routesUsers)
app.use(routesAnimes)

app.get('/', (_, res) => {
  res.json({
    message:
      'Esta é uma API para o dashboard do @AniJSBot. Veja a documentação dela em: https://github.com/Lewizh11/AniJsBot',
  })
})

app.listen(PORT, () => console.log('Server listen: ', PORT))
