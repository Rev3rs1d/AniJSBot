import { Animes } from '../models/Animes'
import { Episodes } from '../models/Episodes'

import { createConnection, Like } from 'typeorm'
import { InlineQueryResult } from 'telegraf/typings/core/types/typegram'

type TextAnime = {
    name: string;
    genre: string;
    description: string;
    anilist_link: string;
}

const getDescription = ({name, genre, description, anilist_link}: TextAnime): string => {
	return `*Nome*: _${name}_\n` +
				 `*Gêneros*: _${genre}_\n` +
				 `*Sobre*: _${description}_\n` +
				 `[Mais informações](${anilist_link})`
}


export const getAnimes = async (animeName: string): Promise<InlineQueryResult[] | []> => {
	const con = await createConnection()
	const search = await con.getRepository(Animes)
		.find({
			name: Like(`%${animeName}%`)
		})
	con.close() 
	
	return search ? search.map(({id, name, description, image_url, genre, anilist_link}) => ({
		id: id.toString(),
		description,
		title: name,
		type: 'article',
		thumbnail: image_url,
		input_message_content: {
			message_text: getDescription({name, genre, description, anilist_link}),
			parse_mode: 'Markdown'
		},
		reply_markup: {inline_keyboard: [[{
			text: 'Ver anime',
			url: `https://t.me/AniJsBot?start=${id}`
		}]]}

	})) : []

}

export const getAnimeById = async (id: number |  string): Promise<Animes> => {
	const con = await createConnection()
	const search = await con.manager.findOne(Animes, id)
	con.close()

	return search
}


export const getEpisode = async (id: number, quality: string = "FHD") => {
	const con = await createConnection()
	const search = await con.createQueryBuilder(Episodes, "episodes")
		.innerJoinAndSelect("episodes.anime", "anime")
		.select(["episodes", "anime.name"])
		.where("episodes.animeId = :id", {id})
		.andWhere("episodes.quality = :quality", {quality})
		.andWhere("anime.id = :id", {id})
		.getMany()
		
	con.close()
	return search
}