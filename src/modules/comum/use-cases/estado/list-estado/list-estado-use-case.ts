import { inject, injectable } from 'tsyringe'
import { Estado } from '@modules/comum/infra/typeorm/entities/estado'
import { IEstadoRepository } from '@modules/comum/repositories/i-estado-repository'

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  columnOrder: Array<'ASC' | 'DESC'>
}

@injectable()
class ListEstadoUseCase {
  constructor(@inject('EstadoRepository')
    private estadoRepository: IEstadoRepository
  ) {}

  async execute({
    search,
    page,
    rowsPerPage,
    columnOrder
  }: IRequest): Promise<Estado[]> {
    try {
      const estados = await this.estadoRepository.list(
        search,
        page,
        rowsPerPage,
        columnOrder
      )

      return estados
    } catch (err) {
      throw err
    }
  }
}

export { ListEstadoUseCase }
