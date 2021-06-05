import { Composer, Markup } from 'telegraf'
import { getAnimeById } from '../utils/animes'

type IAnime = {
  name: string
  description: string
  genre: string
}

export const getText = ({ name, description, genre }: IAnime): string => {
  return `*Nome*: *${name}*\n*Gênero(s)*: _${genre}_\n\n*Sinopse*: _${description}_`
}

const startHandler = Composer.command('start', async (ctx) => {
  const { text, from } = ctx.message
  const { callback, url } = Markup.button
  const isId = text.match(/\s/g)

  if (!isId) {
    return ctx.replyWithMarkdown(
      `Olá [${from.first_name}](tg://user?id=${from.id})[ㅤ ㅤ](https://i.pinimg.com/originals/9f/52/c7/9f52c72b5c38691a69e0586cfa7425c1.png)`,
      Markup.inlineKeyboard([
        [
          {
            text: 'Buscar animes',
            switch_inline_query_current_chat: ' ',
          },
          //callback("Notificações", "notifications")
        ],
        [url('Canal', 'https://t.me/ShuseiKagari')],
        [url('Source', 'https://www.github.com/Lewizh11/anijsbot')],
      ]),
    )
  }

  try {
    const { name, image_url, genre, description, id } = await getAnimeById(
      text.replace('/start ', ''),
    )

    await ctx.replyWithPhoto(image_url, {
      caption: getText({ name, description, genre }),
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [callback('Assistir agora', `quality ${id}`)],
          [callback('Episódios', `episodes ${id}`)],
          [
            callback(
              'Notificar novos episodes',
              `notification ${id} ${from.id}`,
            ),
          ],
        ],
      },
    })
  } catch {
    ctx.replyWithMarkdown('Anime não foi encontrado :\\')
  }
})

export default startHandler
