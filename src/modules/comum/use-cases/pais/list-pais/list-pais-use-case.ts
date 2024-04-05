import { inject, injectable } from 'tsyringe'
import { Pais } from '@modules/comum/infra/typeorm/entities/pais'
import { IPaisRepository } from '@modules/comum/repositories/i-pais-repository'

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  columnOrder: Array<'ASC' | 'DESC'>
}

@injectable()
class ListPaisUseCase {
  constructor(@inject('PaisRepository')
    private paisRepository: IPaisRepository
  ) {}

  async execute({
    search,
    page,
    rowsPerPage,
    columnOrder
  }: IRequest): Promise<Pais[]> {
    try {
      const paises = await this.paisRepository.list(
        search,
        page,
        rowsPerPage,
        columnOrder
      )

      return paises
    } catch (err) {
      throw err
    }
  }
}

export { ListPaisUseCase }
