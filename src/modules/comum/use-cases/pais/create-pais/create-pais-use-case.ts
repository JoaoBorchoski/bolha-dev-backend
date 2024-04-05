import { inject, injectable } from 'tsyringe'
import { Pais } from '@modules/comum/infra/typeorm/entities/pais'
import { IPaisRepository } from '@modules/comum/repositories/i-pais-repository'

interface IRequest {
  codigoPais: string
  nomePais: string
}

@injectable()
class CreatePaisUseCase {
  constructor(@inject('PaisRepository')
    private paisRepository: IPaisRepository
  ) {}

  async execute({
    codigoPais,
    nomePais
  }: IRequest): Promise<Pais> {
    try {
      const result = await this.paisRepository.create({
        codigoPais,
        nomePais
      })

      return result
    } catch (err) {
      throw err
    }
  }
}

export { CreatePaisUseCase }
