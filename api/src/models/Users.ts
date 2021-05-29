import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity()
export class Users {

	@PrimaryGeneratedColumn()
	id: number

	@Column()
	username: string;

	@Column()
	password: string;

	@Column()
	role: string;

	@CreateDateColumn()
	create_at: Date
}
