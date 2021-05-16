import { Composer, deunionize, Markup } from 'telegraf'

const selectQuality = Composer.on("callback_query", async ctx => {
  const { callback_query } = ctx.update
  const data = deunionize(callback_query).data!
  
  if(!data.includes("quality"))
    return
  
  const { callback } = Markup.button
  const id = data.replace(/\D/g,"")

  ctx.editMessageCaption("Selecione a sua qualidade abaixo", {
    reply_markup: {
      inline_keyboard: [[
        callback("SD - 480p", `sd ${id} 0`)
      ], [
        callback("HD - 720p", `hd ${id} 0`)
      ], [
        callback("FHD - 180p", `fdh ${id} 0`)
      ],[
        callback("Voltar ao menu", `menu 0`)
      ]]
    }
  })

})

export default selectQuality 