import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm'

import { Episodes } from './Episodes'
import { Users } from './Users'

@Entity()
export class Animes {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  genre: string

  @Column()
  id_anilist: number

  @Column()
  year: number

  @Column()
  image_url: string

  @Column()
  anilist_link: string

  @Column()
  episode_count: number

  @CreateDateColumn()
  create_at: Date

  @Column()
  userId: number

  @ManyToOne(() => Users, (users) => users.animes)
  user: Users

  @OneToMany(() => Episodes, (episode) => episode.anime)
  episodes: Episodes[]
}
