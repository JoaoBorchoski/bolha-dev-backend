import { inject, injectable } from 'tsyringe'
import { Cep } from '@modules/comum/infra/typeorm/entities/cep'
import { ICepRepository } from '@modules/comum/repositories/i-cep-repository'

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  columnOrder: Array<'ASC' | 'DESC'>
}

@injectable()
class ListCepUseCase {
  constructor(@inject('CepRepository')
    private cepRepository: ICepRepository
  ) {}

  async execute({
    search,
    page,
    rowsPerPage,
    columnOrder
  }: IRequest): Promise<Cep[]> {
    try {
      const ceps = await this.cepRepository.list(
        search,
        page,
        rowsPerPage,
        columnOrder
      )

      return ceps
    } catch (err) {
      throw err
    }
  }
}

export { ListCepUseCase }
