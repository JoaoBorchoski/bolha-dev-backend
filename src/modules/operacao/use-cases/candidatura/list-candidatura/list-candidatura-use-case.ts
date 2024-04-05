import { inject, injectable } from 'tsyringe'
import { Candidatura } from '@modules/operacao/infra/typeorm/entities/candidatura'
import { ICandidaturaRepository } from '@modules/operacao/repositories/i-candidatura-repository'

interface IRequest {
  userId: string,
  search: string,
  page: number,
  rowsPerPage: number,
  columnOrder: Array<'ASC' | 'DESC'>
}

@injectable()
class ListCandidaturaUseCase {
  constructor(@inject('CandidaturaRepository')
    private candidaturaRepository: ICandidaturaRepository
  ) {}

  async execute({
    userId,
    search,
    page,
    rowsPerPage,
    columnOrder
  }: IRequest): Promise<Candidatura[]> {
    try {
      const candidaturas = await this.candidaturaRepository.list(
        userId,
        search,
        page,
        rowsPerPage,
        columnOrder
      )

      return candidaturas
    } catch (err) {
      throw err
    }
  }
}

export { ListCandidaturaUseCase }
