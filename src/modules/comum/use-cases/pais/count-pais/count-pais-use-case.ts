import { inject, injectable } from 'tsyringe'
import { IPaisRepository } from '@modules/comum/repositories/i-pais-repository'

interface IRequest {
  search: string
}

@injectable()
class CountPaisUseCase {
  constructor(@inject('PaisRepository')
    private paisRepository: IPaisRepository
  ) {}

  async execute({
    search
  }: IRequest): Promise<{ count: number }> {
    try {
      const paisesCount = await this.paisRepository.count(search)

      return paisesCount
    } catch (err) {
      throw err
    }
  }
}

export { CountPaisUseCase }
