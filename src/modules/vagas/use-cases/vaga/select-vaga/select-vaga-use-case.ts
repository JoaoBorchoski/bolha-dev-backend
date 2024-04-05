import { inject, injectable } from 'tsyringe'
import { IVagaSelectDTO } from '@modules/vagas/dtos/i-vaga-dto'
import { IVagaRepository } from '@modules/vagas/repositories/i-vaga-repository'

@injectable()
class SelectVagaUseCase {
  constructor(@inject('VagaRepository')
    private vagaRepository: IVagaRepository
  ) {}

  async execute(userId: string): Promise<IVagaSelectDTO[]> {
    try {
      const vagas = await this.vagaRepository.select(userId)

      return vagas
    } catch (err) {
      throw err
    }
  }
}

export { SelectVagaUseCase }
