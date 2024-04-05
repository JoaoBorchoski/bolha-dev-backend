import { DeleteResult, getRepository, Repository } from 'typeorm'
import { IEstadoDTO, IEstadoSelectDTO } from '@modules/comum/dtos/i-estado-dto'
import { IEstadoRepository } from '@modules/comum/repositories/i-estado-repository'
import { Estado } from '@modules/comum/infra/typeorm/entities/estado'
import { noContent, serverError, notFound } from '@shared/helpers'

class EstadoRepository implements IEstadoRepository {
  private repository: Repository<Estado>

  constructor() {
    this.repository = getRepository(Estado)
  }


  // create
  async create({
    codigoIbge,
    uf,
    nomeEstado
  }: IEstadoDTO): Promise<Estado> {
    try {
      const estado = this.repository.create({
        codigoIbge,
        uf,
        nomeEstado
      })

      await this.repository.save(estado)

      return estado
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
  ): Promise<Estado[]> {
    try {
      if ((typeof columnOrder === 'undefined') || (columnOrder.length === 0)) {
        const sortArray = new Array<'ASC' | 'DESC'>(2).fill('ASC')
        columnOrder = sortArray
      }

      const offset = rowsPerPage * page

      let estados = await this.repository.createQueryBuilder('est')
        .select([
          'est.id as "id"',
          'est.uf as "uf"',
          'est.nomeEstado as "nomeEstado"',
        ])
        .andWhere('CAST(est.uf AS VARCHAR) ilike :search', { search: `%${search}%` })
        .orWhere('CAST(est.nomeEstado AS VARCHAR) ilike :search', { search: `%${search}%` })
        .addOrderBy('est.uf', columnOrder[0])
        .addOrderBy('est.nomeEstado', columnOrder[1])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return estados
    } catch (err) {
      throw serverError(err)
    }
  }


  // select
  async select(): Promise<IEstadoSelectDTO[]> {
    try {
      const estados = await this.repository.createQueryBuilder('est')
        .select([
          'est.id',
          'est.uf',
        ])
        .addOrderBy('est.uf')
        .getMany()

      return estados
    } catch (err) {
      throw serverError(err)
    }
  }


  // count
  async count(search: string): Promise<{ count: number }> {
    try {
      const estados = await this.repository.createQueryBuilder('est')
        .select([
          'est.id as "id"',
        ])
        .andWhere('est.uf ilike :search', { search: `%${search}%` })
        .orWhere('est.nomeEstado ilike :search', { search: `%${search}%` })
        .getRawMany()

      return { count: estados.length }
    } catch (err) {
      throw serverError(err)
    }
  }


  // get
  async get(id: string): Promise<Estado> {
    try {
      const estado = await this.repository.findOne(id)

      if (!estado) {
        throw noContent()
      }

      return estado
    } catch (err) {
      throw serverError(err)
    }
  }


  // update
  async update({
    id,
    codigoIbge,
    uf,
    nomeEstado
  }: IEstadoDTO): Promise<Estado> {
    const estado = await this.repository.findOne(id)

    if (!estado) {
      throw notFound()
    }

    const newEstado = this.repository.create({
      id,
      codigoIbge,
      uf,
      nomeEstado
    })

    try {
      await this.repository.save(newEstado)

      return newEstado
    } catch (err) {
      throw serverError(err)
    }
  }


  // delete
  async delete(id: string): Promise<void> {
    let estado: DeleteResult

    try {
      estado = await this.repository.delete(id)
    } catch (err) {
      throw serverError(err)
    }

    if (!estado.affected) {
      throw notFound()
    }
  }
}

export { EstadoRepository }
