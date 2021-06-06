import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { Animes } from '../models/Animes'
import { Users } from '../models/Users'
import { getRepository } from 'typeorm'

export const createAnime = async (req: Request, res: Response) => {
  const errors = validationResult(req)

  if (!errors.isEmpty())
    return res.status(400).json({
      errors: errors.array().map(({ msg, param }) => ({ msg, param })),
    })

  const { name, description, year, imageUrl, anilistLink, genre, idAnilist } =
    req.body

  const repo = getRepository(Animes)
  const exists = await repo.findOne({ name })

  if (exists)
    return res
      .status(400)
      .json({ error: 'Anime is already registered in the database' })

  try {
    await repo.save({
      name,
      description,
      year,
      genre,
      image_url: imageUrl,
      anilist_link: anilistLink,
      episode_count: 0,
      id_anilist: idAnilist,
      userId: (req.user as Users).id,
    })

    res.status(201).json({ msg: 'Anime created with success' })
  } catch ({ message }) {
    console.log(message)

    res.status(500).json({ error: 'Error in server' })
  }
}

const queryParse = (query: any): number | undefined => parseInt(query)

export const getAnimes = async (req: Request, res: Response) => {
  const user = req.user as Users
  const { query } = req
  const repo = getRepository(Animes)
  const skip = queryParse(query.skip) || 0
  const take = queryParse(query.take) || 10

  const animes = await repo.find(
    user.role !== 'admininstrator'
      ? {
          select: [
            'anilist_link',
            'description',
            'genre',
            'name',
            'year',
            'id',
            'episode_count',
            'id_anilist',
            'image_url',
          ],
          skip,
          take,
          where: { userId: user.id },
        }
      : { skip, take },
  )

  res.json({ animes })
}

export const editAnime = async (req: Request, res: Response) => {
  const errors = validationResult(req)

  if (!errors.isEmpty())
    return res.status(400).json({
      errors: errors.array().map(({ msg, param }) => ({ msg, param })),
    })

  const { id, description, genre, name, year, imageUrl } = req.body
  const repo = getRepository(Animes)
  const anime = await repo.findOne({ id, userId: (req.user as Users).id})

  if (!anime)
    return res.status(400).json({
      error: 'Anime not registered in database or anime not was registered by you',
    })

  try {
    const newAnime = await repo.update(anime, {
      description,
      genre,
      name,
      year,
      image_url: imageUrl,
    })

    res.json({ msg: 'Anime updated' })
  } catch ({ message }) {
    console.log(message)

    res.status(500).json({ error: 'Error in server' })
  }
}
