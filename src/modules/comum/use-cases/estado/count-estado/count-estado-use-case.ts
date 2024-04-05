import { inject, injectable } from 'tsyringe'
import { IEstadoRepository } from '@modules/comum/repositories/i-estado-repository'

interface IRequest {
  search: string
}

@injectable()
class CountEstadoUseCase {
  constructor(@inject('EstadoRepository')
    private estadoRepository: IEstadoRepository
  ) {}

  async execute({
    search
  }: IRequest): Promise<{ count: number }> {
    try {
      const estadosCount = await this.estadoRepository.count(search)

      return estadosCount
    } catch (err) {
      throw err
    }
  }
}

export { CountEstadoUseCase }
