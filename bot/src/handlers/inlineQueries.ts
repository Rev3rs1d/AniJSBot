import { Composer } from 'telegraf'
import { getAnimes} from '../utils/animes'

const handleLine = Composer.on('inline_query', async ctx => {
	const { update } = ctx
	const { query } = update.inline_query

	const result = await getAnimes(query)
	
	ctx.answerInlineQuery(result)
})


export default handleLine
