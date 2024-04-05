import { inject, injectable } from 'tsyringe'
import { Cep } from '@modules/comum/infra/typeorm/entities/cep'
import { ICepRepository } from '@modules/comum/repositories/i-cep-repository'

interface IRequest {
  codigoCep: string
  logradouro: string
  bairro: string
  estadoId: string
  cidadeId: string
}

@injectable()
class CreateCepUseCase {
  constructor(@inject('CepRepository')
    private cepRepository: ICepRepository
  ) {}

  async execute({
    codigoCep,
    logradouro,
    bairro,
    estadoId,
    cidadeId
  }: IRequest): Promise<Cep> {
    try {
      const result = await this.cepRepository.create({
        codigoCep,
        logradouro,
        bairro,
        estadoId,
        cidadeId
      })

      return result
    } catch (err) {
      throw err
    }
  }
}

export { CreateCepUseCase }
