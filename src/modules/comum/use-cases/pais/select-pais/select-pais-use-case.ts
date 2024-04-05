import { inject, injectable } from 'tsyringe'
import { IPaisSelectDTO } from '@modules/comum/dtos/i-pais-dto'
import { IPaisRepository } from '@modules/comum/repositories/i-pais-repository'

@injectable()
class SelectPaisUseCase {
  constructor(@inject('PaisRepository')
    private paisRepository: IPaisRepository
  ) {}

  async execute(): Promise<IPaisSelectDTO[]> {
    try {
      const paises = await this.paisRepository.select()

      return paises
    } catch (err) {
      throw err
    }
  }
}

export { SelectPaisUseCase }
