import { inject, injectable } from 'tsyringe'
import { Cep } from '@modules/comum/infra/typeorm/entities/cep'
import { ICepRepository } from '@modules/comum/repositories/i-cep-repository'

interface IRequest {
  id: string
  codigoCep: string
  logradouro: string
  bairro: string
  estadoId: string
  cidadeId: string
}

@injectable()
class UpdateCepUseCase {
  constructor(@inject('CepRepository')
    private cepRepository: ICepRepository
  ) {}

  async execute({
    id,
    codigoCep,
    logradouro,
    bairro,
    estadoId,
    cidadeId
  }: IRequest): Promise<Cep> {
    try {
      const cep = await this.cepRepository.update({
        id,
        codigoCep,
        logradouro,
        bairro,
        estadoId,
        cidadeId
      })

      return cep
    } catch (err) {
      throw err
    }
  }
}

export { UpdateCepUseCase }
