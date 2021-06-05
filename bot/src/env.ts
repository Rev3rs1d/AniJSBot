import { config } from 'dotenv'
import { str, cleanEnv } from 'envalid'

config()
export default cleanEnv(process.env, {
  TOKEN: str()
})
