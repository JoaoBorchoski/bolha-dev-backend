import { inject, injectable } from 'tsyringe'
import { IEstadoSelectDTO } from '@modules/comum/dtos/i-estado-dto'
import { IEstadoRepository } from '@modules/comum/repositories/i-estado-repository'

@injectable()
class SelectEstadoUseCase {
  constructor(@inject('EstadoRepository')
    private estadoRepository: IEstadoRepository
  ) {}

  async execute(): Promise<IEstadoSelectDTO[]> {
    try {
      const estados = await this.estadoRepository.select()

      return estados
    } catch (err) {
      throw err
    }
  }
}

export { SelectEstadoUseCase }
