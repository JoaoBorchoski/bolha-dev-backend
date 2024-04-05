import { inject, injectable } from 'tsyringe'
import { Cidade } from '@modules/comum/infra/typeorm/entities/cidade'
import { ICidadeRepository } from '@modules/comum/repositories/i-cidade-repository'

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  columnOrder: Array<'ASC' | 'DESC'>
}

@injectable()
class ListCidadeUseCase {
  constructor(@inject('CidadeRepository')
    private cidadeRepository: ICidadeRepository
  ) {}

  async execute({
    search,
    page,
    rowsPerPage,
    columnOrder
  }: IRequest): Promise<Cidade[]> {
    try {
      const cidades = await this.cidadeRepository.list(
        search,
        page,
        rowsPerPage,
        columnOrder
      )

      return cidades
    } catch (err) {
      throw err
    }
  }
}

export { ListCidadeUseCase }
