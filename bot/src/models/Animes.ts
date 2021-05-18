import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm'
import { Episodes } from './Episodes'

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

	@OneToMany(() => Episodes, episode => episode.anime )
	episodes: Episodes[]

}
