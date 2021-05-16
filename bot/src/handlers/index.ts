import startHandler from './startHandler'
import inlineQueries from './inlineQueries'
import callback from './selectQuality'

import { bot } from '../index'

const init = (): void => {
	bot.use(startHandler)
	bot.use(inlineQueries)	
	bot.use(callback)
}

export default init
