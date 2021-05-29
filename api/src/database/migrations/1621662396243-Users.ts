import { MigrationInterface, QueryRunner, Table} from "typeorm";

export class Users1621662396243 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
			await queryRunner.createTable(
				new Table({
					name: 'users',
					columns: [
						{							
							name: 'id',
							type: 'int',
							isPrimary: true,
							isGenerated: true,
							generationStrategy: 'increment'
						},
						{
							name: 'username',
							type: 'varchar',
							isUnique: true
						},
						{
							name: 'password',
							type: 'varchar'
						},
						{
							name: 'role',
							type: 'varchar'
						},
						{
							name: 'create_at',
							type: 'timestamp',
							default: 'now()'
						}
					]
					
				})
			)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    	await queryRunner.dropTable('users')
		}

}
