import { inject, injectable } from 'tsyringe'
import { Estado } from '@modules/comum/infra/typeorm/entities/estado'
import { IEstadoRepository } from '@modules/comum/repositories/i-estado-repository'

@injectable()
class DeleteEstadoUseCase {
  constructor(@inject('EstadoRepository')
    private estadoRepository: IEstadoRepository
  ) {}

  async execute(id: string): Promise<Estado[]> {
    try {
      await this.estadoRepository.delete(id)

      const estados= await this.estadoRepository.list('', 0, 100, [])
  
      return estados
    } catch (err) {
      throw err
    }
  }
}

export { DeleteEstadoUseCase }
