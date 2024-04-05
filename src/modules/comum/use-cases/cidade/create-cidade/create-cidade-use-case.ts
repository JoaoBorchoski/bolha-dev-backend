import { inject, injectable } from 'tsyringe'
import { Cidade } from '@modules/comum/infra/typeorm/entities/cidade'
import { ICidadeRepository } from '@modules/comum/repositories/i-cidade-repository'

interface IRequest {
  estadoId: string
  codigoIbge: string
  nomeCidade: string
}

@injectable()
class CreateCidadeUseCase {
  constructor(@inject('CidadeRepository')
    private cidadeRepository: ICidadeRepository
  ) {}

  async execute({
    estadoId,
    codigoIbge,
    nomeCidade
  }: IRequest): Promise<Cidade> {
    try {
      const result = await this.cidadeRepository.create({
        estadoId,
        codigoIbge,
        nomeCidade
      })

      return result
    } catch (err) {
      throw err
    }
  }
}

export { CreateCidadeUseCase }
