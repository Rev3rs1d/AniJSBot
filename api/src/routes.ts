import passport from 'passport'
import { Router } from 'express'
import { body } from 'express-validator'
//import episodes from './controllers/EpisodesController'
import {
  loginUser,
  createUser,
  updateUser,
} from './controllers/UsersController'
import auth from './etc/authUser'

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

router.put(
  '/editUser',
  body('username').isLength({ min: 5 }),
  body('newUsername').isLength({ min: 5 }),
  body('newName').isLength({ min: 5 }),
  passport.authenticate('jwt', { session: false }),
  updateUser,
)

export default router
