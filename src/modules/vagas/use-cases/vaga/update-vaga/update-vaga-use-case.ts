import { inject, injectable } from 'tsyringe'
import { Vaga } from '@modules/vagas/infra/typeorm/entities/vaga'
import { IVagaRepository } from '@modules/vagas/repositories/i-vaga-repository'

interface IRequest {
  userId: string
  id: string
  nomeVaga: string
  paisId: string
  estadoId: string
  cidadeId: string
  descricao: string
  numeroCandidaturas: number
  desabilitado: boolean
}

@injectable()
class UpdateVagaUseCase {
  constructor(@inject('VagaRepository')
    private vagaRepository: IVagaRepository
  ) {}

  async execute({
    userId,
    id,
    nomeVaga,
    paisId,
    estadoId,
    cidadeId,
    descricao,
    numeroCandidaturas,
    desabilitado
  }: IRequest): Promise<Vaga> {
    try {
      const vaga = await this.vagaRepository.update({
        userId,
        id,
        nomeVaga,
        paisId,
        estadoId,
        cidadeId,
        descricao,
        numeroCandidaturas,
        desabilitado
      })

      return vaga
    } catch (err) {
      throw err
    }
  }
}

export { UpdateVagaUseCase }
