import { inject, injectable } from 'tsyringe'
import { ICandidaturaRepository } from '@modules/operacao/repositories/i-candidatura-repository'

interface IRequest {
  userId: string
  search: string
}

@injectable()
class CountCandidaturaUseCase {
  constructor(@inject('CandidaturaRepository')
    private candidaturaRepository: ICandidaturaRepository
  ) {}

  async execute({
    userId,
    search
  }: IRequest): Promise<{ count: number }> {
    try {
      const candidaturasCount = await this.candidaturaRepository.count(
        userId,
        search
      )

      return candidaturasCount
    } catch (err) {
      throw err
    }
  }
}

export { CountCandidaturaUseCase }
