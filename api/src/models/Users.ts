import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany
} from 'typeorm'

import { Animes } from './Animes'

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  password: string

  @Column()
  role: string

  @Column()
  name: string

  @CreateDateColumn()
  create_at: Date

  @OneToMany(() => Animes, animes => animes.user)
  animes: Animes[]
}
