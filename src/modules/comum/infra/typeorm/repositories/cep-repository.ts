import { DeleteResult, getRepository, Repository } from 'typeorm'
import { ICepDTO, ICepSelectDTO } from '@modules/comum/dtos/i-cep-dto'
import { ICepRepository } from '@modules/comum/repositories/i-cep-repository'
import { Cep } from '@modules/comum/infra/typeorm/entities/cep'
import { noContent, serverError, notFound } from '@shared/helpers'

class CepRepository implements ICepRepository {
  private repository: Repository<Cep>

  constructor() {
    this.repository = getRepository(Cep)
  }


  // create
  async create({
    codigoCep,
    logradouro,
    bairro,
    estadoId,
    cidadeId
  }: ICepDTO): Promise<Cep> {
    try {
      const cep = this.repository.create({
        codigoCep,
        logradouro,
        bairro,
        estadoId,
        cidadeId
      })

      await this.repository.save(cep)

      return cep
    } catch (err) {
      throw serverError(err)
    }
  }


  // list
  async list(
    search: string,
    page: number,
    rowsPerPage: number,
    columnOrder: Array<'ASC' | 'DESC'>
  ): Promise<Cep[]> {
    try {
      if ((typeof columnOrder === 'undefined') || (columnOrder.length === 0)) {
        const sortArray = new Array<'ASC' | 'DESC'>(3).fill('ASC')
        columnOrder = sortArray
      }

      const offset = rowsPerPage * page

      let ceps = await this.repository.createQueryBuilder('cep')
        .select([
          'cep.id as "id"',
          'cep.codigoCep as "codigoCep"',
          'cep.logradouro as "logradouro"',
          'cep.bairro as "bairro"',
        ])
        .andWhere('CAST(cep.codigoCep AS VARCHAR) ilike :search', { search: `%${search}%` })
        .orWhere('CAST(cep.logradouro AS VARCHAR) ilike :search', { search: `%${search}%` })
        .orWhere('CAST(cep.bairro AS VARCHAR) ilike :search', { search: `%${search}%` })
        .addOrderBy('cep.codigoCep', columnOrder[0])
        .addOrderBy('cep.logradouro', columnOrder[1])
        .addOrderBy('cep.bairro', columnOrder[2])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ceps
    } catch (err) {
      throw serverError(err)
    }
  }


  // select
  async select(): Promise<ICepSelectDTO[]> {
    try {
      const ceps = await this.repository.createQueryBuilder('cep')
        .select([
          'cep.',
          'cep.',
        ])
        .addOrderBy('cep.')
        .getMany()

      return ceps
    } catch (err) {
      throw serverError(err)
    }
  }


  // count
  async count(search: string): Promise<{ count: number }> {
    try {
      const ceps = await this.repository.createQueryBuilder('cep')
        .select([
          'cep.id as "id"',
        ])
        .andWhere('cep.codigoCep ilike :search', { search: `%${search}%` })
        .orWhere('cep.logradouro ilike :search', { search: `%${search}%` })
        .orWhere('cep.bairro ilike :search', { search: `%${search}%` })
        .getRawMany()

      return { count: ceps.length }
    } catch (err) {
      throw serverError(err)
    }
  }


  // get
  async get(id: string): Promise<Cep> {
    try {
      const cep = await this.repository.findOne(id)

      if (!cep) {
        throw noContent()
      }

      return cep
    } catch (err) {
      throw serverError(err)
    }
  }


  // update
  async update({
    id,
    codigoCep,
    logradouro,
    bairro,
    estadoId,
    cidadeId
  }: ICepDTO): Promise<Cep> {
    const cep = await this.repository.findOne(id)

    if (!cep) {
      throw notFound()
    }

    const newCep = this.repository.create({
      id,
      codigoCep,
      logradouro,
      bairro,
      estadoId,
      cidadeId
    })

    try {
      await this.repository.save(newCep)

      return newCep
    } catch (err) {
      throw serverError(err)
    }
  }


  // delete
  async delete(id: string): Promise<void> {
    let cep: DeleteResult

    try {
      cep = await this.repository.delete(id)
    } catch (err) {
      throw serverError(err)
    }

    if (!cep.affected) {
      throw notFound()
    }
  }
}

export { CepRepository }
