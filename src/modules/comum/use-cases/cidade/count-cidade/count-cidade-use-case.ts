import { inject, injectable } from 'tsyringe'
import { ICidadeRepository } from '@modules/comum/repositories/i-cidade-repository'

interface IRequest {
  search: string
}

@injectable()
class CountCidadeUseCase {
  constructor(@inject('CidadeRepository')
    private cidadeRepository: ICidadeRepository
  ) {}

  async execute({
    search
  }: IRequest): Promise<{ count: number }> {
    try {
      const cidadesCount = await this.cidadeRepository.count(search)

      return cidadesCount
    } catch (err) {
      throw err
    }
  }
}

export { CountCidadeUseCase }
