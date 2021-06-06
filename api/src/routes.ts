import passport from 'passport'
import { Router } from 'express'
import { body } from 'express-validator'
import {
  loginUser,
  createUser,
  updateUser,
  deleteUser,
} from './controllers/UsersController'
import {
  createAnime,
  getAnimes,
  editAnime,
  deleteAnime,
} from './controllers/AnimesController'
import auth from './middlewares/authUser'

const router = Router()
passport.use(auth)

//router.post('/episodes', body('username').isEmail(), episodes.addEpisode)

router.post(
  '/user',
  body('username').isLength({ min: 5 }),
  body('password').isLength({ min: 5 }),
  loginUser,
)

router.put(
  '/user',
  body('username').isLength({ min: 5 }),
  body('name').isLength({ min: 5 }),
  body('password').isLength({ min: 5 }),
  createUser,
)

router.patch(
  '/user',
  body('username').isLength({ min: 5 }),
  body('newUsername').isLength({ min: 5 }),
  body('newName').isLength({ min: 5 }),
  passport.authenticate('jwt', { session: false }),
  updateUser,
)

router.delete(
  '/user',
  body('password').isLength({ min: 5 }),
  body('username').isLength({ min: 5 }),
  passport.authenticate('jwt', { session: false }),
  deleteUser,
)

router.post(
  '/anime',
  body('name').isLength({ min: 3 }),
  body('description').isLength({ min: 5 }),
  body('year').isNumeric(),
  body('genre').isLength({ min: 3 }),
  body('imageUrl').isLength({ min: 5 }),
  body('anilistLink').isURL(),
  body('idAnilist').isLength({ min: 1 }),
  passport.authenticate('jwt', { session: false }),
  createAnime,
)

router.get(
  '/animes',
  passport.authenticate('jwt', { session: false }),
  getAnimes,
)

router.patch(
  '/anime',
  body('description').isLength({ min: 5 }),
  body('genre').isLength({ min: 3 }),
  body('name').isLength({ min: 2 }),
  body('year').isNumeric(),
  body('imageUrl').isURL(),
  body('id').isNumeric(),
  passport.authenticate('jwt', { session: false }),
  editAnime,
)

router.delete(
  '/anime',
  body('id').isNumeric(),
  passport.authenticate('jwt', { session: false }),
  deleteAnime
)

export default router
