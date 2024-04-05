import { DeleteResult, getRepository, Repository } from 'typeorm'
import { IPaisDTO, IPaisSelectDTO } from '@modules/comum/dtos/i-pais-dto'
import { IPaisRepository } from '@modules/comum/repositories/i-pais-repository'
import { Pais } from '@modules/comum/infra/typeorm/entities/pais'
import { noContent, serverError, notFound } from '@shared/helpers'

class PaisRepository implements IPaisRepository {
  private repository: Repository<Pais>

  constructor() {
    this.repository = getRepository(Pais)
  }


  // create
  async create({
    codigoPais,
    nomePais
  }: IPaisDTO): Promise<Pais> {
    try {
      const pais = this.repository.create({
        codigoPais,
        nomePais
      })

      await this.repository.save(pais)

      return pais
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
  ): Promise<Pais[]> {
    try {
      if ((typeof columnOrder === 'undefined') || (columnOrder.length === 0)) {
        const sortArray = new Array<'ASC' | 'DESC'>(2).fill('ASC')
        columnOrder = sortArray
      }

      const offset = rowsPerPage * page

      let paises = await this.repository.createQueryBuilder('pai')
        .select([
          'pai.id as "id"',
          'pai.codigoPais as "codigoPais"',
          'pai.nomePais as "nomePais"',
        ])
        .andWhere('CAST(pai.codigoPais AS VARCHAR) ilike :search', { search: `%${search}%` })
        .orWhere('CAST(pai.nomePais AS VARCHAR) ilike :search', { search: `%${search}%` })
        .addOrderBy('pai.codigoPais', columnOrder[0])
        .addOrderBy('pai.nomePais', columnOrder[1])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return paises
    } catch (err) {
      throw serverError(err)
    }
  }


  // select
  async select(): Promise<IPaisSelectDTO[]> {
    try {
      const paises = await this.repository.createQueryBuilder('pai')
        .select([
          'pai.id',
          'pai.nomePais',
        ])
        .addOrderBy('pai.nomePais')
        .getMany()

      return paises
    } catch (err) {
      throw serverError(err)
    }
  }


  // count
  async count(search: string): Promise<{ count: number }> {
    try {
      const paises = await this.repository.createQueryBuilder('pai')
        .select([
          'pai.id as "id"',
        ])
        .andWhere('pai.codigoPais ilike :search', { search: `%${search}%` })
        .orWhere('pai.nomePais ilike :search', { search: `%${search}%` })
        .getRawMany()

      return { count: paises.length }
    } catch (err) {
      throw serverError(err)
    }
  }


  // get
  async get(id: string): Promise<Pais> {
    try {
      const pais = await this.repository.findOne(id)

      if (!pais) {
        throw noContent()
      }

      return pais
    } catch (err) {
      throw serverError(err)
    }
  }


  // update
  async update({
    id,
    codigoPais,
    nomePais
  }: IPaisDTO): Promise<Pais> {
    const pais = await this.repository.findOne(id)

    if (!pais) {
      throw notFound()
    }

    const newPais = this.repository.create({
      id,
      codigoPais,
      nomePais
    })

    try {
      await this.repository.save(newPais)

      return newPais
    } catch (err) {
      throw serverError(err)
    }
  }


  // delete
  async delete(id: string): Promise<void> {
    let pais: DeleteResult

    try {
      pais = await this.repository.delete(id)
    } catch (err) {
      throw serverError(err)
    }

    if (!pais.affected) {
      throw notFound()
    }
  }
}

export { PaisRepository }
