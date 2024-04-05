import { inject, injectable } from 'tsyringe'
import { Cidade } from '@modules/comum/infra/typeorm/entities/cidade'
import { ICidadeRepository } from '@modules/comum/repositories/i-cidade-repository'

interface IRequest {
  id: string
  estadoId: string
  codigoIbge: string
  nomeCidade: string
}

@injectable()
class UpdateCidadeUseCase {
  constructor(@inject('CidadeRepository')
    private cidadeRepository: ICidadeRepository
  ) {}

  async execute({
    id,
    estadoId,
    codigoIbge,
    nomeCidade
  }: IRequest): Promise<Cidade> {
    try {
      const cidade = await this.cidadeRepository.update({
        id,
        estadoId,
        codigoIbge,
        nomeCidade
      })

      return cidade
    } catch (err) {
      throw err
    }
  }
}

export { UpdateCidadeUseCase }
