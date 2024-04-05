import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { Pais } from '@modules/comum/infra/typeorm/entities/pais'
import { Estado } from '@modules/comum/infra/typeorm/entities/estado'
import { Cidade } from '@modules/comum/infra/typeorm/entities/cidade'
import { User } from '@modules/security/infra/typeorm/entities/user'

@Entity('candidaturas')
class Candidatura {
  @PrimaryColumn()
  id?: string

  @Column({ name: 'nome', nullable: true })
  nome?: string

  @Column({ name: 'cep', nullable: true })
  cep?: string

  @ManyToOne(() => Pais, { nullable: true, eager: true })
  @JoinColumn({ name: 'pais_id', referencedColumnName: 'id' })
  paisId?: string

  @ManyToOne(() => Estado, { nullable: true, eager: true })
  @JoinColumn({ name: 'estado_id', referencedColumnName: 'id' })
  estadoId?: string

  @ManyToOne(() => Cidade, { nullable: true, eager: true })
  @JoinColumn({ name: 'cidade_id', referencedColumnName: 'id' })
  cidadeId?: string

  @Column({ name: 'descricao', nullable: true })
  descricao?: string

  @ManyToOne(() => User, { nullable: true, eager: true })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  userId?: string

  @CreateDateColumn({ name: 'created_at', nullable: true })
  createdAt?: Date

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt?: Date

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}

export { Candidatura }
