import { Router } from 'express'
import { body } from 'express-validator'
import passport from 'passport'
import { createAnime, getAnimes } from '../controllers/AnimesController'
import authUser from '../etc/authUser'

passport.use(authUser)

const routes = Router()

routes.post(
  '/anime',
  body('name').isLength({ min: 3 }),
  body('description').isLength({ min: 5 }),
  body('year').isNumeric(),
  body('genre').isLength({ min: 3 }),
  body('imageUrl').isLength({ min: 5 }),
  body('anilistLink').isLength({ min: 5 }),
  body('idAnilist').isLength({ min: 1 }),
  passport.authenticate('jwt', { session: false }),
  createAnime,
)

routes.get(
  '/animes',
  passport.authenticate('jwt', { session: false }),
  getAnimes,
)

export default routes
