import 'reflect-metadata'
import './database'

import { Telegraf } from 'telegraf'
import env from './env'
import init from './handlers'

export const bot = new Telegraf(
  env.TOKEN
)

init()
bot.launch()


process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
