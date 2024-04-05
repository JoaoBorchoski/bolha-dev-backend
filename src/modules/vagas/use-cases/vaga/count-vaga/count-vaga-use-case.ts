import { inject, injectable } from 'tsyringe'
import { IVagaRepository } from '@modules/vagas/repositories/i-vaga-repository'

interface IRequest {
  userId: string
  search: string
}

@injectable()
class CountVagaUseCase {
  constructor(@inject('VagaRepository')
    private vagaRepository: IVagaRepository
  ) {}

  async execute({
    userId,
    search
  }: IRequest): Promise<{ count: number }> {
    try {
      const vagasCount = await this.vagaRepository.count(
        userId,
        search
      )

      return vagasCount
    } catch (err) {
      throw err
    }
  }
}

export { CountVagaUseCase }
