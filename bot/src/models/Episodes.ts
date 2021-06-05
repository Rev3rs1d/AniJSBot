import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm'
import { Animes } from './Animes'

@Entity()
export class Episodes {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  file_id: string

  @Column()
  episode_number: number

  @Column()
  quality: string

  @CreateDateColumn()
  create_at: Date

  @Column()
  animeId!: number

  @ManyToOne(() => Animes, (anime) => anime.episodes)
  anime: Animes
}
