import { Animes } from './models/Animes'
import { Episodes } from './models/Episodes'
import { createConnection } from 'typeorm'

;(async () => {
  const connection = await createConnection()
  const animes = new Animes()

  animes.name = 'Steins;Gate 0'
  animes.description =
    'Steins;Gate reconta os fatos desde o 23 alternativo em Steins;Gate em que Okabe falha ao salvar Makise Kurisu'
  animes.genre = 'Sci-Fi'
  animes.year = 1
  animes.id_anilist = 21127
  animes.anilist_link = 'https://anilist.co/anime/21127/SteinsGate-0'
  animes.image_url =
    'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21127-7ARWZkDXKiiD.jpg'
  animes.episode_count = 13
  await connection.manager.save(animes)
  const episodes: string[] = [
    'BAACAgQAAxkBAAIXdWCiqBx-D60Zia562ulf3a-vpe_fAAJvAwACK395UkzITlWMdNm7HwQ',
    'BAACAgQAAxkBAAIXdmCiqBzNurzOJlWxRvnDPykLA7P-AAIuBAACnvDJUlGw5RxAhB6GHwQ',
    'BAACAgQAAxkBAAIXd2CiqBw4kUS2vH2ZI7QbPD86v6ZDAAKiAgACTUUZU2Cq2uG9EouXHwQ',
    'BAACAgQAAxkBAAIXeGCiqBxpT0yuGr3kyHL4C9h8TovhAAIJBAACFKJZU0DIGAEy-fNcHwQ',
    'BAACAgQAAxkBAAIXeWCiqBxiTRGaxvzWHQvfqdkmxLyPAAKPAwACyqShU1OrKpqmENWZHwQ',
    'BAACAgQAAxkBAAIXemCiqBw2kc6gs7CNW28sbgABzP6u8gAC8QIAAuvR8FNoXb80ICw2px8E',
    'BAACAgQAAxkBAAIXe2CiqByECXKCHNOsc5iQwRzMXdkQAAIIAwACRZY5UPZfroDikGHFHwQ',
    'BAACAgQAAxkBAAIXfGCiqBx-ijZ4pWtR3oX-qo8QTkWKAAKuBAACemGJUHIZOHi9xcTKHwQ',
    'BAACAgQAAxkBAAIXfWCiqBzUH5y_z6esvuVGsez-7S5sAAKqBQAC_DLRUMNReYDCO5SIHwQ',
    'BAACAgQAAxkBAAIXfmCiqBwy-bKAJ9o1YZWb51AQUWw1AAJVBgACHRUYUf5O61-MoG66HwQ',
    'BAACAgQAAxkBAAIXf2CiqBxB-cLFixFLWIdQD3omo6j1AAL6BQACvMhgUbEWyZML5FIJHwQ',
    'BAACAgQAAxkBAAIXgGCiqBxruQ9_HXsx1PWLwFtO6P9DAAJZBAACalupUcH5LB1Bx_m1HwQ',
    'BAACAgQAAxkBAAIXgWCiqBy9nYr6tH3VJ-fzZydDsNJFAAJdBAACpaL5UU_SRX0T8Jo3HwQ',
  ]

  let index = 0

  for (const episode of episodes) {
    index += 1

    const insert = new Episodes()
    insert.episode_number = index
    insert.file_id = episode
    insert.quality = 'HD'
    insert.anime = animes

    await connection.manager.save(insert)
    console.log(insert)
  }
  // const handler = connection.manager.getRepository(Animes)
  // const animes = await handler.find({ relations: ['episodes'] })

  // for(const anime of animes){
  //   for(const episode of anime.episodes) {
  //     console.log(episode)
  //   }
  // }
})()
