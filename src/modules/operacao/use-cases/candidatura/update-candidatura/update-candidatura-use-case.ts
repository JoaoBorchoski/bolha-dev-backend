import { inject, injectable } from 'tsyringe'
import { Candidatura } from '@modules/operacao/infra/typeorm/entities/candidatura'
import { ICandidaturaRepository } from '@modules/operacao/repositories/i-candidatura-repository'

interface IRequest {
  userId: string
  id: string
  nome: string
  cep: string
  paisId: string
  estadoId: string
  cidadeId: string
  descricao: string
}

@injectable()
class UpdateCandidaturaUseCase {
  constructor(@inject('CandidaturaRepository')
    private candidaturaRepository: ICandidaturaRepository
  ) {}

  async execute({
    userId,
    id,
    nome,
    cep,
    paisId,
    estadoId,
    cidadeId,
    descricao
  }: IRequest): Promise<Candidatura> {
    try {
      const candidatura = await this.candidaturaRepository.update({
        userId,
        id,
        nome,
        cep,
        paisId,
        estadoId,
        cidadeId,
        descricao
      })

      return candidatura
    } catch (err) {
      throw err
    }
  }
}

export { UpdateCandidaturaUseCase }
