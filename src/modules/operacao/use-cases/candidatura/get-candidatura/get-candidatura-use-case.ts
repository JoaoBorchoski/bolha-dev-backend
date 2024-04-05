import { inject, injectable } from 'tsyringe'
import { Candidatura } from '@modules/operacao/infra/typeorm/entities/candidatura'
import { ICandidaturaRepository } from '@modules/operacao/repositories/i-candidatura-repository'

@injectable()
class GetCandidaturaUseCase {
  constructor(@inject('CandidaturaRepository')
    private candidaturaRepository: ICandidaturaRepository
  ) {}

  async execute(id: string): Promise<Candidatura> {
    try {
      const candidatura = await this.candidaturaRepository.get(id)
  
      return candidatura
    } catch (err) {
      throw err
    }
  }
}

export { GetCandidaturaUseCase }
