import { DeleteResult, getRepository, Repository } from 'typeorm'
import { ICandidaturaDTO, ICandidaturaSelectDTO } from '@modules/operacao/dtos/i-candidatura-dto'
import { ICandidaturaRepository } from '@modules/operacao/repositories/i-candidatura-repository'
import { Candidatura } from '@modules/operacao/infra/typeorm/entities/candidatura'
import { noContent, serverError, notFound } from '@shared/helpers'

class CandidaturaRepository implements ICandidaturaRepository {
  private repository: Repository<Candidatura>

  constructor() {
    this.repository = getRepository(Candidatura)
  }


  // create
  async create({
    userId,
    nome,
    cep,
    paisId,
    estadoId,
    cidadeId,
    descricao
  }: ICandidaturaDTO): Promise<Candidatura> {
    try {
      const candidatura = this.repository.create({
        userId,
        nome,
        cep,
        paisId,
        estadoId,
        cidadeId,
        descricao
      })

      await this.repository.save(candidatura)

      return candidatura
    } catch (err) {
      throw serverError(err)
    }
  }


  // list
  async list(
    userId: string,
    search: string,
    page: number,
    rowsPerPage: number,
    columnOrder: Array<'ASC' | 'DESC'>
  ): Promise<Candidatura[]> {
    try {
      if ((typeof columnOrder === 'undefined') || (columnOrder.length === 0)) {
        const sortArray = new Array<'ASC' | 'DESC'>(1).fill('ASC')
        columnOrder = sortArray
      }

      const offset = rowsPerPage * page

      let candidaturas = await this.repository.createQueryBuilder('can')
        .select([
          'can.id as "id"',
          'can.nome as "nome"',
        ])
        .where('can.userId = :userId', { userId })
        .andWhere('CAST(can.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
        .addOrderBy('can.nome', columnOrder[0])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return candidaturas
    } catch (err) {
      throw serverError(err)
    }
  }


  // select
  async select(userId: string): Promise<ICandidaturaSelectDTO[]> {
    try {
      const candidaturas = await this.repository.createQueryBuilder('can')
        .select([
          'can.',
          'can.',
        ])
        .where('can.userId = :userId', { userId })
        .addOrderBy('can.')
        .getMany()

      return candidaturas
    } catch (err) {
      throw serverError(err)
    }
  }


  // count
  async count(
    userId: string,
    search: string
  ): Promise<{ count: number }> {
    try {
      const candidaturas = await this.repository.createQueryBuilder('can')
        .select([
          'can.id as "id"',
        ])
        .where('can.userId = :userId', { userId })
        .andWhere('can.nome ilike :search', { search: `%${search}%` })
        .getRawMany()

      return { count: candidaturas.length }
    } catch (err) {
      throw serverError(err)
    }
  }


  // get
  async get(id: string): Promise<Candidatura> {
    try {
      const candidatura = await this.repository.findOne(id)

      if (!candidatura) {
        throw noContent()
      }

      return candidatura
    } catch (err) {
      throw serverError(err)
    }
  }


  // update
  async update({
    id,
    userId,
    nome,
    cep,
    paisId,
    estadoId,
    cidadeId,
    descricao
  }: ICandidaturaDTO): Promise<Candidatura> {
    const candidatura = await this.repository.findOne(id)

    if (!candidatura) {
      throw notFound()
    }

    const newCandidatura = this.repository.create({
      id,
      userId,
      nome,
      cep,
      paisId,
      estadoId,
      cidadeId,
      descricao
    })

    try {
      await this.repository.save(newCandidatura)

      return newCandidatura
    } catch (err) {
      throw serverError(err)
    }
  }


  // delete
  async delete(id: string): Promise<void> {
    let candidatura: DeleteResult

    try {
      candidatura = await this.repository.delete(id)
    } catch (err) {
      throw serverError(err)
    }

    if (!candidatura.affected) {
      throw notFound()
    }
  }
}

export { CandidaturaRepository }
