import { inject, injectable } from 'tsyringe'
import { ICepRepository } from '@modules/comum/repositories/i-cep-repository'

interface IRequest {
  search: string
}

@injectable()
class CountCepUseCase {
  constructor(@inject('CepRepository')
    private cepRepository: ICepRepository
  ) {}

  async execute({
    search
  }: IRequest): Promise<{ count: number }> {
    try {
      const cepsCount = await this.cepRepository.count(search)

      return cepsCount
    } catch (err) {
      throw err
    }
  }
}

export { CountCepUseCase }
