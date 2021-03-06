import { compareSync, hashSync } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { validationResult } from 'express-validator'
import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import env from '../env'
import { Users } from '../models/Users'

interface IUser {
  name: string
  password: string
  username: string
}

export const loginUser = async (req: Request, res: Response) => {
  const errors = validationResult(req)

  if (!errors.isEmpty())
    return res.status(400).json({
      errors: errors.array().map(({ msg, param }) => ({ msg, param })),
    })

  const { username, password } = req.body
  const repo = getRepository(Users)
  const user = await repo.findOne({ username })

  if (!user)
    return res.status(400).json({
      error: 'User is not registered',
    })

  const compare = compareSync(password, user.password)

  if (!compare)
    return res.status(401).json({
      error: 'The password is not valid for this user',
    })

  const token = sign(
    { id: user.id, user: user.username, role: user.role },
    env.SECRET,
  )

  res.status(201).json({ login: true, token: `Bearer ${token}` })
}

export const createUser = async (req: Request, res: Response) => {
  const errors = validationResult(req)

  if (!errors.isEmpty())
    return res.status(400).json({
      errors: errors.array().map(({ msg, param }) => ({ msg, param })),
    })

  const { name, username, password }: IUser = req.body
  const repo = getRepository(Users)
  const findUsername = await repo.findOne({ username })

  if (findUsername)
    return res
      .status(401)
      .json({ error: 'User is already registered in the database' })

  const passwordHashed = hashSync(password, 8)

  try {
    await repo.save({
      name,
      password: passwordHashed,
      username,
      role: 'member',
    })

    return res.status(201).json({
      msg: 'user created with success',
    })
  } catch ({ message }) {
    console.log(message)

    return res.status(500).json({
      error: 'Error in server',
    })
  }
}

export const updateUser = async (req: Request, res: Response) => {
  const errors = validationResult(req)

  if (!errors.isEmpty())
    return res.status(400).json({
      errors: errors.array().map(({ msg, param }) => ({ msg, param })),
    })

  const { username, newUsername, newName } = req.body

  if ((req.user as Users).username != username)
    return res
      .status(401)
      .json({ errors: 'Username in your token is different' })

  const repo = getRepository(Users)
  const user = await repo.findOne({ username })

  user.name = newName
  user.username = newUsername

  try {
    const token = sign(
      { id: user.id, user: user.username, role: user.role },
      env.SECRET,
    )

    await repo.save(user)

    return res.json({
      msg: 'User updated',
      username: newUsername,
      name: newName,
      token: `Bearer ${token}`,
    })
  } catch ({ message }) {
    console.log(message)

    return res
      .status(500)
      .json({ error: 'Error on server connection with database' })
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  const errors = validationResult(req)

  if (!errors.isEmpty())
    return res.status(400).json({
      errors: errors.array().map(({ msg, param }) => ({ msg, param })),
    })

  const { username, password } = req.body
  const repo = getRepository(Users)
  const user = await repo.findOne({ username })

  if (!user)
    return res.status(400).json({
      error: 'User is not registered',
    })

  const compare = compareSync(password, user.password)

  if (!compare)
    return res.status(401).json({
      error: 'The password is not valid for this user',
    })

  try {
    await repo.remove(user)

    res.json({ msg: 'Account deleted' })
  } catch ({ message }) {
    res.status(500).json({ error: 'Server error' })
  }
}
