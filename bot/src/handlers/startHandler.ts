import { Composer, Markup } from 'telegraf'
import { inlineKeyboard } from 'telegraf/typings/markup'
import { getAnimeById } from '../utils/animes'

type IAnime = {
	name: string,
	description: string;
	genre: string;
}

const getText = ({name, description, genre}: IAnime): string => {
	return `*Nome*: *${name}*\n*Gênero(s)*: _${genre}_\n\n*Sinopse*: _${description}`
}



const startHandler = Composer.command("start", async ctx => {
	const { text, from } = ctx.message
	const isId = text.match(/\s/g)
	
	if(!isId) {
		return ctx.replyWithMarkdown(`Olá [${from.first_name}](tg://user?id=${from.id})[ㅤ ㅤ](https://i.pinimg.com/originals/9f/52/c7/9f52c72b5c38691a69e0586cfa7425c1.png)`,
			Markup.inlineKeyboard([[
				Markup.button.callback("Buscar animes", ".."),
				Markup.button.callback("Notificações", "notifications")
			],[
				Markup.button.url("Canal", "https://t.me/ShuseiKagari"),
				Markup.button.callback("Como usar o bot", "help")
			],[
				Markup.button.url("Source", "https://www.github.com/Lewizh11/anijsbot")
			]]
		))
	}
	
	const {
		name, image_url, genre, 
		id, description, id_anilist
	} = await getAnimeById(text.replace("/start ",""))

	ctx.replyWithPhoto(image_url, {
		caption: getText({name, description, genre}),
		reply_markup: {
			inline_keyboard: [[
				Markup.button.callback("Assistir agora", `watch ${id}`)
			], [
				Markup.button.callback("Episódios", `episodes ${id}`)
			], [
				Markup.button.callback("Notificar novos episodes", `notification ${id} ${from.id}`)
			]]
		}
	})

})

export default startHandler
