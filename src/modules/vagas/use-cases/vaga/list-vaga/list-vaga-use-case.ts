import { inject, injectable } from 'tsyringe'
import { Vaga } from '@modules/vagas/infra/typeorm/entities/vaga'
import { IVagaRepository } from '@modules/vagas/repositories/i-vaga-repository'

interface IRequest {
  userId: string,
  search: string,
  page: number,
  rowsPerPage: number,
  columnOrder: Array<'ASC' | 'DESC'>
}

@injectable()
class ListVagaUseCase {
  constructor(@inject('VagaRepository')
    private vagaRepository: IVagaRepository
  ) {}

  async execute({
    userId,
    search,
    page,
    rowsPerPage,
    columnOrder
  }: IRequest): Promise<Vaga[]> {
    try {
      const vagas = await this.vagaRepository.list(
        userId,
        search,
        page,
        rowsPerPage,
        columnOrder
      )

      return vagas
    } catch (err) {
      throw err
    }
  }
}

export { ListVagaUseCase }
