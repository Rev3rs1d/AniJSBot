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

export const getAnimes = async (req: Request, res: Response) => {
  const user = req.user as Users
  const repo = getRepository(Animes)

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
          where: { userId: user.id },
        }
      : {},
  )

  res.json({ animes })
}
