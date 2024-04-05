import { inject, injectable } from 'tsyringe'
import { Pais } from '@modules/comum/infra/typeorm/entities/pais'
import { IPaisRepository } from '@modules/comum/repositories/i-pais-repository'

interface IRequest {
  id: string
  codigoPais: string
  nomePais: string
}

@injectable()
class UpdatePaisUseCase {
  constructor(@inject('PaisRepository')
    private paisRepository: IPaisRepository
  ) {}

  async execute({
    id,
    codigoPais,
    nomePais
  }: IRequest): Promise<Pais> {
    try {
      const pais = await this.paisRepository.update({
        id,
        codigoPais,
        nomePais
      })

      return pais
    } catch (err) {
      throw err
    }
  }
}

export { UpdatePaisUseCase }
