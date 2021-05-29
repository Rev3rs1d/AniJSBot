import { compareSync } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { validationResult } from 'express-validator'
import { Request, Response } from 'express'
import { createConnection } from 'typeorm'

import env from '../env'
import { Users } from '../models/Users'

const getToken = async (req: Request, res: Response) => {
	const errors = validationResult(req)
	
	if(!errors.isEmpty())
		return res.status(400).json({ 
			errors: errors.array()
				.map( ({msg, param}) => ({ error: msg, field: param}) )
		}
	)

	const { username, password } = req.body
	const conn = await createConnection()
	const user = await conn.manager.findOne(Users, {
		username
	})
	
	conn.close()
	
	if(!user)
		return res.status(400).json({
			error: 'User is not registered'
		})

	const compare = compareSync(password, user.password)

	if(!compare)
		return res.status(401).json({
			error: 'The password is not valid for this user'
	})

	const token = sign({ user: user.username, role: user.role }, env.SECRET)
	
	res.status(201).json({ login: true, token})

}

export {
	getToken
}
