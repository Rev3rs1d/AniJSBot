import { Router } from 'express'
import { body } from 'express-validator'
import episodes from './controllers/EpisodesController'
import { login, create } from './controllers/UsersController'

const router = Router()

router.post('/episodes', body(
	'username'
).isEmail(), episodes.addEpisode)

router.post(
	'/user', body('username')
		.isLength({ min: 5}),
	body('password')
		.isLength({ min: 5}),
	login
)

router.put(
	'/user', body('username')
		.isLength({ min: 5}),
	body('name')
		.isLength({ min: 5})
		,
	body('password')
		.isLength({ min: 5}),
	create
)

export default router
