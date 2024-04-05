import { inject, injectable } from 'tsyringe'
import { Estado } from '@modules/comum/infra/typeorm/entities/estado'
import { IEstadoRepository } from '@modules/comum/repositories/i-estado-repository'

interface IRequest {
  id: string
  codigoIbge: string
  uf: string
  nomeEstado: string
}

@injectable()
class UpdateEstadoUseCase {
  constructor(@inject('EstadoRepository')
    private estadoRepository: IEstadoRepository
  ) {}

  async execute({
    id,
    codigoIbge,
    uf,
    nomeEstado
  }: IRequest): Promise<Estado> {
    try {
      const estado = await this.estadoRepository.update({
        id,
        codigoIbge,
        uf,
        nomeEstado
      })

      return estado
    } catch (err) {
      throw err
    }
  }
}

export { UpdateEstadoUseCase }
