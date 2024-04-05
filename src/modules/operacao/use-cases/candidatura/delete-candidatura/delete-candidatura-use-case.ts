import { inject, injectable } from 'tsyringe'
import { Candidatura } from '@modules/operacao/infra/typeorm/entities/candidatura'
import { ICandidaturaRepository } from '@modules/operacao/repositories/i-candidatura-repository'

@injectable()
class DeleteCandidaturaUseCase {
  constructor(@inject('CandidaturaRepository')
    private candidaturaRepository: ICandidaturaRepository
  ) {}

  async execute(id: string): Promise<Candidatura[]> {
    try {
      await this.candidaturaRepository.delete(id)

      const candidaturas= await this.candidaturaRepository.list('', 0, 100, [])
  
      return candidaturas
    } catch (err) {
      throw err
    }
  }
}

export { DeleteCandidaturaUseCase }
