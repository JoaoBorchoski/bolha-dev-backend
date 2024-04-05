import { DeleteResult, getRepository, Repository } from 'typeorm'
import { ICidadeDTO, ICidadeSelectDTO } from '@modules/comum/dtos/i-cidade-dto'
import { ICidadeRepository } from '@modules/comum/repositories/i-cidade-repository'
import { Cidade } from '@modules/comum/infra/typeorm/entities/cidade'
import { noContent, serverError, notFound } from '@shared/helpers'

class CidadeRepository implements ICidadeRepository {
  private repository: Repository<Cidade>

  constructor() {
    this.repository = getRepository(Cidade)
  }


  // create
  async create({
    estadoId,
    codigoIbge,
    nomeCidade
  }: ICidadeDTO): Promise<Cidade> {
    try {
      const cidade = this.repository.create({
        estadoId,
        codigoIbge,
        nomeCidade
      })

      await this.repository.save(cidade)

      return cidade
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
  ): Promise<Cidade[]> {
    try {
      if ((typeof columnOrder === 'undefined') || (columnOrder.length === 0)) {
        const sortArray = new Array<'ASC' | 'DESC'>(2).fill('ASC')
        columnOrder = sortArray
      }

      const offset = rowsPerPage * page

      let cidades = await this.repository.createQueryBuilder('cid')
        .select([
          'cid.id as "id"',
          'a.id as "estadoId"',
          'a.uf as "estadoUf"',
          'cid.nomeCidade as "nomeCidade"',
        ])
        .leftJoin('cid.estadoId', 'a')
        .andWhere('CAST(a.uf AS VARCHAR) ilike :search', { search: `%${search}%` })
        .orWhere('CAST(cid.nomeCidade AS VARCHAR) ilike :search', { search: `%${search}%` })
        .addOrderBy('a.uf', columnOrder[0])
        .addOrderBy('cid.nomeCidade', columnOrder[1])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return cidades
    } catch (err) {
      throw serverError(err)
    }
  }


  // select
  async select(): Promise<ICidadeSelectDTO[]> {
    try {
      const cidades = await this.repository.createQueryBuilder('cid')
        .select([
          'cid.id',
          'cid.nomeCidade',
        ])
        .addOrderBy('cid.nomeCidade')
        .getMany()

      return cidades
    } catch (err) {
      throw serverError(err)
    }
  }


  // count
  async count(search: string): Promise<{ count: number }> {
    try {
      const cidades = await this.repository.createQueryBuilder('cid')
        .select([
          'cid.id as "id"',
        ])
        .leftJoin('cid.estadoId', 'a')
        .andWhere('a.uf ilike :search', { search: `%${search}%` })
        .orWhere('cid.nomeCidade ilike :search', { search: `%${search}%` })
        .getRawMany()

      return { count: cidades.length }
    } catch (err) {
      throw serverError(err)
    }
  }


  // get
  async get(id: string): Promise<Cidade> {
    try {
      const cidade = await this.repository.findOne(id)

      if (!cidade) {
        throw noContent()
      }

      return cidade
    } catch (err) {
      throw serverError(err)
    }
  }


  // update
  async update({
    id,
    estadoId,
    codigoIbge,
    nomeCidade
  }: ICidadeDTO): Promise<Cidade> {
    const cidade = await this.repository.findOne(id)

    if (!cidade) {
      throw notFound()
    }

    const newCidade = this.repository.create({
      id,
      estadoId,
      codigoIbge,
      nomeCidade
    })

    try {
      await this.repository.save(newCidade)

      return newCidade
    } catch (err) {
      throw serverError(err)
    }
  }


  // delete
  async delete(id: string): Promise<void> {
    let cidade: DeleteResult

    try {
      cidade = await this.repository.delete(id)
    } catch (err) {
      throw serverError(err)
    }

    if (!cidade.affected) {
      throw notFound()
    }
  }
}

export { CidadeRepository }
