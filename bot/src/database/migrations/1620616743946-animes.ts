import { MigrationInterface, QueryRunner , Table, TableForeignKey } from "typeorm";

export class animes1620616743946 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    	await queryRunner.createTable(
				new Table({
					name: 'animes',
					columns: [
						{
							name: 'id',
							type: 'int',
							isPrimary: true,
							isGenerated: true,
							generationStrategy: 'increment'
						},
						{
							name: 'name',
							type: 'varchar'
						},
						{
							name: 'description',
							type: 'varchar'
						},
						{
							name: 'genre',
							type: 'varchar'
						},
						{
							name: 'id_anilist',
							type: 'int'
						},
						{
							name: 'year',
							type: 'int'
						},{
							name: 'image_url',
							type: 'varchar'
						},
							{
							name: 'anilist_link',
							type: 'varchar'
						},
						{
							name: 'create_at',
							type: 'timestamp',
							default: 'now()'
						},
					]
				})
			)

			await queryRunner.createTable(
				new Table({
					name: 'episodes',
					columns: [
						{
							name: 'id',
							type: 'int',
							isPrimary: true,
							isGenerated: true,
							generationStrategy: 'increment'
						},	
						{
							name: 'file_id',
							type: 'varchar'
						},
						{
							name: 'animeId',
							type: 'int'
						},
						{	
							name: 'episode_number',
							type: 'int'
						},
						{
							name: 'quality',
							type: 'varchar'
						},
						{
							name: 'create_at',
							type: 'timestamp',
							default: 'now()'
						},
					]
				})
			)
			await queryRunner.createForeignKey(
				'episodes', new TableForeignKey({
					columnNames: ['animeId'],
					referencedColumnNames: ['id'],
					referencedTableName: 'animes',
					onDelete: 'CASCADE'
			})
			)
		}
    public async down(queryRunner: QueryRunner): Promise<void> {
    	const table = await queryRunner.getTable('episodes')
			const foreingKey = table?.foreignKeys.find( fk => fk.columnNames.indexOf('animeId') !== -1)
			await queryRunner.dropForeignKey('episodes', foreingKey!)
			await queryRunner.dropTable('episodes')
			await queryRunner.dropTable('animes')
		}

}
