import { Users } from './models/Users'
import { createConnection } from 'typeorm'
import { hashSync } from 'bcrypt'

(async () => {
	
	const con = await createConnection()
	const user = new Users()
	const hash = hashSync("el psy kongroo", 8)
	
	user.username = 'Lewiz'
	user.role = 'admin'
	user.password = hash

	await con.manager.save(user)

})()
