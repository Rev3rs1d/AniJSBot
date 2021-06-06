import { getRepository } from 'typeorm'
import { Users } from '../models/Users'
import { Strategy, ExtractJwt } from 'passport-jwt'
import env from '../env'

export default new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.SECRET,
  },
  async function (jwtPayload, done) {
    const repo = getRepository(Users)
    const user = await repo.findOne(jwtPayload.id, {
      select: ['username', 'role', 'name', 'id'],
    })

    if (!user)
      return done(
        {
          status: false,
          error:
            'You not are authenticatered or the anime was not registered by you',
        },
        false,
      )

    return done(null, user)
  },
)
