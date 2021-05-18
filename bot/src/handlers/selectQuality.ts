import { Composer, deunionize, Markup, Context } from 'telegraf'
import { getEpisode, getAnimeById } from '../utils/animes'
import { getText } from './startHandler'

const utils = ({callbackQuery}: Context) => {
  const data = deunionize(callbackQuery).data!
  const { callback } = Markup.button
  const animeId = parseInt(data.replace(/\D/g,''))

  return { animeId, callback, data }
}


const quality = async (ctx: Context) => {
  const {animeId, callback} = utils(ctx)
 
  ctx.editMessageMedia({
    type: 'photo',
    media: 'https://i.redd.it/osfjivbxlxq41.png',
    caption: 'Selecione a sua qualidade abaixo'
  }, {
    reply_markup: {
      inline_keyboard: [[
        callback('SD - 480p', `sendEpisode SD ${animeId} 0`)
      ], [
        callback('HD - 720p', `sendEpisode HD ${animeId} 0`)
      ], [
        callback('FHD - 180p', `sendEpisode FHD ${animeId} 0`)
      ],[
        callback('Voltar ao menu', `menu ${animeId}`)
      ]]
    }
  })
}

const sendEpisode = async (ctx: Context) => {
  const { callback, data} = utils(ctx)
  const [query, quality, id, ep] = data.split(' ') 
  const epNumber = parseInt(ep)
  const { episode }  = await getEpisode(parseInt(id), epNumber, quality)

  if(episode){
    // área de perigo
    const { episode_number, anime, file_id } = episode
    const next = episode_number !== anime.episode_count ? [
      callback('🔙', `${query} ${quality} ${id} ${epNumber - 1}`),
      callback('🔜', `${query} ${quality} ${id} ${episode.episode_number}`)
    ] : [
      callback('🔙', `${query} ${quality} ${id} ${epNumber - 1}`)
    ]
    
    const opt = !epNumber ? [
      callback(`Escolher resolução`, `quality ${id}`),
      callback('🔜', `${query} ${quality} ${id} ${episode.episode_number}`)
    ] : next  

    ctx.editMessageMedia({
      type: 'video',
      media: file_id,
      caption:`Anime: *${anime.name}*\nQualidade: ${quality}\nEpisódio: (${episode_number} / ${anime.episode_count})`,
      parse_mode: 'Markdown'
     },{
       reply_markup: {
         inline_keyboard: [
           opt, [callback('Menu do anime', `menu ${id}`)]
          ]
       }
     })
  }
    
}

const menu = async (ctx: Context) => {
  const { animeId, callback } = utils(ctx)
  try {
		const {
			name, image_url, genre, 
			description, id
		} = await getAnimeById(animeId)
		
		await ctx.editMessageMedia({
      type: 'photo',
      media: image_url, 
			caption: getText({name, description, genre}),
			parse_mode: 'Markdown'
    },
      {
        reply_markup: {
				inline_keyboard: [[
					callback('Assistir agora', `quality ${id}`)
				], [
					callback('Episódios', `episodes ${id}`)
				], [
					callback('Notificar novos episodes', `notification ${id} ${ctx.from.id}`)
				]]
			}
		})
		
	} catch {
	 ctx.replyWithMarkdown('Anime não foi encontrado :\\')
	}

}

const mainCallbacks = Composer.on('callback_query', ctx => {
  const { data } = utils(ctx)
  const main = {
    sendEpisode,
    quality,
    menu
  } 
  try{
    main[data.split(' ')[0]](ctx)
  
  } catch ({message}) {
  
    console.log(message)
  }
})

export default mainCallbacks 