import {cleanEnv, str, num} from 'envalid'
import dotenv from 'dotenv'

dotenv.config()

export default cleanEnv(process.env, {
	SECRET: str(),
	PORT: num()
})
