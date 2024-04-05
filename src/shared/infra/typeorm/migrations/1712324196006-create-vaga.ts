import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateVaga1712324196006 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'vagas',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'nome_vaga',
            type: 'varchar',
            isNullable: false,
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
            isNullable: false,
          },
          {
            name: 'numero_candidaturas',
            type: 'decimal',
            isNullable: true,
          },
          {
            name: 'desabilitado',
            type: 'boolean',
            default: false,
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
            name: 'FKPaisVaga',
            referencedTableName: 'paises',
            referencedColumnNames: ['id'],
            columnNames: ['pais_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKEstadoVaga',
            referencedTableName: 'estados',
            referencedColumnNames: ['id'],
            columnNames: ['estado_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKCidadeVaga',
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
    await queryRunner.dropTable('vagas')
  }
}
