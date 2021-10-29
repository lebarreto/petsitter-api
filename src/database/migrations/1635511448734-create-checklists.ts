import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createChecklists1635511448734 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'checklists',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'pet_id',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'user_id',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'questions',
                        type: 'varchar',
                        isArray: true,
                        isNullable: false,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            })
        )
      
        await queryRunner.createForeignKey(
            'checklists',
            new TableForeignKey({
                name: 'OwnerInfo',
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        )
      
        await queryRunner.createForeignKey(
            'checklists',
            new TableForeignKey({
                name: 'PetInfo',
                columnNames: ['pet_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'pets',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('checklists', 'OwnerInfo');
        await queryRunner.dropForeignKey('checklists', 'PetInfo');
        await queryRunner.dropTable('checklists')
    }

}
