import { inject, injectable } from 'tsyringe'
import { Estado } from '@modules/comum/infra/typeorm/entities/estado'
import { IEstadoRepository } from '@modules/comum/repositories/i-estado-repository'

@injectable()
class GetEstadoUseCase {
  constructor(@inject('EstadoRepository')
    private estadoRepository: IEstadoRepository
  ) {}

  async execute(id: string): Promise<Estado> {
    try {
      const estado = await this.estadoRepository.get(id)
  
      return estado
    } catch (err) {
      throw err
    }
  }
}

export { GetEstadoUseCase }
