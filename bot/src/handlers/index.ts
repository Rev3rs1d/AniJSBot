import startHandler from './startHandler'
import inlineQueries from './inlineQueries'

import { bot } from '../index'

const init = (): void => {
	bot.use(startHandler)
	bot.use(inlineQueries)	
}

export default init
