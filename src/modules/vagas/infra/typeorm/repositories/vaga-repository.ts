import { DeleteResult, getRepository, Repository } from 'typeorm'
import { IVagaDTO, IVagaSelectDTO } from '@modules/vagas/dtos/i-vaga-dto'
import { IVagaRepository } from '@modules/vagas/repositories/i-vaga-repository'
import { Vaga } from '@modules/vagas/infra/typeorm/entities/vaga'
import { noContent, serverError, notFound } from '@shared/helpers'

class VagaRepository implements IVagaRepository {
  private repository: Repository<Vaga>

  constructor() {
    this.repository = getRepository(Vaga)
  }


  // create
  async create({
    userId,
    nomeVaga,
    paisId,
    estadoId,
    cidadeId,
    descricao,
    numeroCandidaturas,
    desabilitado
  }: IVagaDTO): Promise<Vaga> {
    try {
      const vaga = this.repository.create({
        userId,
        nomeVaga,
        paisId,
        estadoId,
        cidadeId,
        descricao,
        numeroCandidaturas,
        desabilitado
      })

      await this.repository.save(vaga)

      return vaga
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
  ): Promise<Vaga[]> {
    try {
      if ((typeof columnOrder === 'undefined') || (columnOrder.length === 0)) {
        const sortArray = new Array<'ASC' | 'DESC'>(1).fill('ASC')
        columnOrder = sortArray
      }

      const offset = rowsPerPage * page

      let vagas = await this.repository.createQueryBuilder('vag')
        .select([
          'vag.id as "id"',
          'vag.nomeVaga as "nomeVaga"',
        ])
        .where('vag.userId = :userId', { userId })
        .andWhere('CAST(vag.nomeVaga AS VARCHAR) ilike :search', { search: `%${search}%` })
        .addOrderBy('vag.nomeVaga', columnOrder[0])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return vagas
    } catch (err) {
      throw serverError(err)
    }
  }


  // select
  async select(userId: string): Promise<IVagaSelectDTO[]> {
    try {
      const vagas = await this.repository.createQueryBuilder('vag')
        .select([
          'vag.',
          'vag.',
        ])
        .where('vag.userId = :userId', { userId })
        .addOrderBy('vag.')
        .getMany()

      return vagas
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
      const vagas = await this.repository.createQueryBuilder('vag')
        .select([
          'vag.id as "id"',
        ])
        .where('vag.userId = :userId', { userId })
        .andWhere('vag.nomeVaga ilike :search', { search: `%${search}%` })
        .getRawMany()

      return { count: vagas.length }
    } catch (err) {
      throw serverError(err)
    }
  }


  // get
  async get(id: string): Promise<Vaga> {
    try {
      const vaga = await this.repository.findOne(id)

      if (!vaga) {
        throw noContent()
      }

      return vaga
    } catch (err) {
      throw serverError(err)
    }
  }


  // update
  async update({
    id,
    userId,
    nomeVaga,
    paisId,
    estadoId,
    cidadeId,
    descricao,
    numeroCandidaturas,
    desabilitado
  }: IVagaDTO): Promise<Vaga> {
    const vaga = await this.repository.findOne(id)

    if (!vaga) {
      throw notFound()
    }

    const newVaga = this.repository.create({
      id,
      userId,
      nomeVaga,
      paisId,
      estadoId,
      cidadeId,
      descricao,
      numeroCandidaturas,
      desabilitado
    })

    try {
      await this.repository.save(newVaga)

      return newVaga
    } catch (err) {
      throw serverError(err)
    }
  }


  // delete
  async delete(id: string): Promise<void> {
    let vaga: DeleteResult

    try {
      vaga = await this.repository.delete(id)
    } catch (err) {
      throw serverError(err)
    }

    if (!vaga.affected) {
      throw notFound()
    }
  }
}

export { VagaRepository }
