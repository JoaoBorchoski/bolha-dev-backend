import { inject, injectable } from 'tsyringe'
import { Pais } from '@modules/comum/infra/typeorm/entities/pais'
import { IPaisRepository } from '@modules/comum/repositories/i-pais-repository'

@injectable()
class DeletePaisUseCase {
  constructor(@inject('PaisRepository')
    private paisRepository: IPaisRepository
  ) {}

  async execute(id: string): Promise<Pais[]> {
    try {
      await this.paisRepository.delete(id)

      const paises= await this.paisRepository.list('', 0, 100, [])
  
      return paises
    } catch (err) {
      throw err
    }
  }
}

export { DeletePaisUseCase }
