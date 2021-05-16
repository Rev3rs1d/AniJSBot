import { Telegraf } from 'telegraf'
import init from './handlers'

export const bot = new Telegraf('1408374825:AAEQ8c3wEi42oAJn69kDmqZVrrZLDZgumdU')

init()
bot.launch()

// Stop bot after
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
