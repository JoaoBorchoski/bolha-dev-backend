import { inject, injectable } from 'tsyringe'
import { ICandidaturaSelectDTO } from '@modules/operacao/dtos/i-candidatura-dto'
import { ICandidaturaRepository } from '@modules/operacao/repositories/i-candidatura-repository'

@injectable()
class SelectCandidaturaUseCase {
  constructor(@inject('CandidaturaRepository')
    private candidaturaRepository: ICandidaturaRepository
  ) {}

  async execute(userId: string): Promise<ICandidaturaSelectDTO[]> {
    try {
      const candidaturas = await this.candidaturaRepository.select(userId)

      return candidaturas
    } catch (err) {
      throw err
    }
  }
}

export { SelectCandidaturaUseCase }
