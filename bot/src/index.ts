import { Telegraf } from 'telegraf'
import init from './handlers'

export const bot = new Telegraf('')

init()
bot.launch()

// Stop bot after
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
