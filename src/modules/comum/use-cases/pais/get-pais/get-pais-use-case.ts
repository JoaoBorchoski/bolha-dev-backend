import { inject, injectable } from 'tsyringe'
import { Pais } from '@modules/comum/infra/typeorm/entities/pais'
import { IPaisRepository } from '@modules/comum/repositories/i-pais-repository'

@injectable()
class GetPaisUseCase {
  constructor(@inject('PaisRepository')
    private paisRepository: IPaisRepository
  ) {}

  async execute(id: string): Promise<Pais> {
    try {
      const pais = await this.paisRepository.get(id)
  
      return pais
    } catch (err) {
      throw err
    }
  }
}

export { GetPaisUseCase }
