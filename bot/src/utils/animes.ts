import { Animes } from '../models/Animes'
import { Episodes } from '../models/Episodes'

import { getRepository, Like } from 'typeorm'
import { InlineQueryResult } from 'telegraf/typings/core/types/typegram'

type TextAnime = {
  name: string
  genre: string
  description: string
  anilist_link: string
}

const getDescription = ({
  name,
  genre,
  description,
  anilist_link,
}: TextAnime): string => {
  return (
    `*Nome*: _${name}_\n` +
    `*Gêneros*: _${genre}_\n` +
    `*Sobre*: _${description}_\n` +
    `[Mais informações](${anilist_link})`
  )
}

export const getAnimes = async (
  animeName: string,
): Promise<InlineQueryResult[] | []> => {
  
	const search = await getRepository(Animes).find({
    name: Like(`%${animeName}%`),
  })
  

  return search
    ? search.map(
        ({ id, name, description, image_url, genre, anilist_link }) => ({
          id: id.toString(),
          description,
          title: name,
          type: 'article',
          thumbnail: image_url,
          input_message_content: {
            message_text: getDescription({
              name,
              genre,
              description,
              anilist_link,
            }),
            parse_mode: 'Markdown',
          },
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: 'Ver anime',
                  url: `https://t.me/AniJsBot?start=${id}`,
                },
              ],
            ],
          },
        }),
      )
    : []
}

export const getAnimeById = async (id: number | string): Promise<Animes> => {
  const repo = getRepository(Animes)
  const search = await repo.findOne(id)

  return search
}

export const getEpisode = async (
  id: number,
  start: number = 0,
  quality: string = 'FHD',
) => {
  const repo = getRepository(Episodes)
  const episode = await repo
    .createQueryBuilder('episodes')
    .innerJoinAndSelect('episodes.anime', 'anime')
    .select(['episodes', 'anime.name', 'anime.episode_count'])
    .where('episodes.animeId = :id', { id })
    .andWhere('episodes.quality = :quality', { quality })
    .andWhere('anime.id = :id', { id })
    .skip(start)
    .take(1)
    .getMany()

  return {
    episode: episode.shift(),
  }
}
