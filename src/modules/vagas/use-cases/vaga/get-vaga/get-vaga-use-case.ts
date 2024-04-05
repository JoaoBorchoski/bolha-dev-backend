import { inject, injectable } from 'tsyringe'
import { Vaga } from '@modules/vagas/infra/typeorm/entities/vaga'
import { IVagaRepository } from '@modules/vagas/repositories/i-vaga-repository'

@injectable()
class GetVagaUseCase {
  constructor(@inject('VagaRepository')
    private vagaRepository: IVagaRepository
  ) {}

  async execute(id: string): Promise<Vaga> {
    try {
      const vaga = await this.vagaRepository.get(id)
  
      return vaga
    } catch (err) {
      throw err
    }
  }
}

export { GetVagaUseCase }
