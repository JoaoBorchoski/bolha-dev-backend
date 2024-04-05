import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateCandidatura1712324196005 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'candidaturas',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'nome',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'cep',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'pais_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'estado_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'cidade_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'descricao',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          }
        ],
        foreignKeys: [
          {
            name: 'FKPaisCandidatura',
            referencedTableName: 'paises',
            referencedColumnNames: ['id'],
            columnNames: ['pais_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKEstadoCandidatura',
            referencedTableName: 'estados',
            referencedColumnNames: ['id'],
            columnNames: ['estado_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKCidadeCandidatura',
            referencedTableName: 'cidades',
            referencedColumnNames: ['id'],
            columnNames: ['cidade_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          }
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('candidaturas')
  }
}
