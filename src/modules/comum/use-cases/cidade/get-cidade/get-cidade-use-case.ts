import { inject, injectable } from 'tsyringe'
import { Cidade } from '@modules/comum/infra/typeorm/entities/cidade'
import { ICidadeRepository } from '@modules/comum/repositories/i-cidade-repository'

@injectable()
class GetCidadeUseCase {
  constructor(@inject('CidadeRepository')
    private cidadeRepository: ICidadeRepository
  ) {}

  async execute(id: string): Promise<Cidade> {
    try {
      const cidade = await this.cidadeRepository.get(id)
  
      return cidade
    } catch (err) {
      throw err
    }
  }
}

export { GetCidadeUseCase }
