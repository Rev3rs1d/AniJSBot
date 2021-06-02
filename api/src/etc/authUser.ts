import { createConnection } from 'typeorm'
import { Users } from '../models/Users'
import { Strategy, ExtractJwt } from 'passport-jwt'
import env from '../env'

export default new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.SECRET,
  },
  async function (jwtPayload, done) {
    const conn = await createConnection()
    const repo = conn.getRepository(Users)
    const user = await repo.findOne(jwtPayload.id)
    await conn.close()
    if (!user) return done(null, false)

    return done(null, user)
  },
)
