import { inject, injectable } from 'tsyringe'
import { Vaga } from '@modules/vagas/infra/typeorm/entities/vaga'
import { IVagaRepository } from '@modules/vagas/repositories/i-vaga-repository'

interface IRequest {
  userId: string
  nomeVaga: string
  paisId: string
  estadoId: string
  cidadeId: string
  descricao: string
  numeroCandidaturas: number
  desabilitado: boolean
}

@injectable()
class CreateVagaUseCase {
  constructor(@inject('VagaRepository')
    private vagaRepository: IVagaRepository
  ) {}

  async execute({
    userId,
    nomeVaga,
    paisId,
    estadoId,
    cidadeId,
    descricao,
    numeroCandidaturas,
    desabilitado
  }: IRequest): Promise<Vaga> {
    try {
      const result = await this.vagaRepository.create({
        userId,
        nomeVaga,
        paisId,
        estadoId,
        cidadeId,
        descricao,
        numeroCandidaturas,
        desabilitado
      })

      return result
    } catch (err) {
      throw err
    }
  }
}

export { CreateVagaUseCase }
