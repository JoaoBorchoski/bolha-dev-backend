import { inject, injectable } from 'tsyringe'
import { Candidatura } from '@modules/operacao/infra/typeorm/entities/candidatura'
import { ICandidaturaRepository } from '@modules/operacao/repositories/i-candidatura-repository'

interface IRequest {
  userId: string
  nome: string
  cep: string
  paisId: string
  estadoId: string
  cidadeId: string
  descricao: string
}

@injectable()
class CreateCandidaturaUseCase {
  constructor(@inject('CandidaturaRepository')
    private candidaturaRepository: ICandidaturaRepository
  ) {}

  async execute({
    userId,
    nome,
    cep,
    paisId,
    estadoId,
    cidadeId,
    descricao
  }: IRequest): Promise<Candidatura> {
    try {
      const result = await this.candidaturaRepository.create({
        userId,
        nome,
        cep,
        paisId,
        estadoId,
        cidadeId,
        descricao
      })

      return result
    } catch (err) {
      throw err
    }
  }
}

export { CreateCandidaturaUseCase }
