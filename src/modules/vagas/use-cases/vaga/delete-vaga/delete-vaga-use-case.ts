import { inject, injectable } from 'tsyringe'
import { Vaga } from '@modules/vagas/infra/typeorm/entities/vaga'
import { IVagaRepository } from '@modules/vagas/repositories/i-vaga-repository'

@injectable()
class DeleteVagaUseCase {
  constructor(@inject('VagaRepository')
    private vagaRepository: IVagaRepository
  ) {}

  async execute(id: string): Promise<Vaga[]> {
    try {
      await this.vagaRepository.delete(id)

      const vagas= await this.vagaRepository.list('', 0, 100, [])
  
      return vagas
    } catch (err) {
      throw err
    }
  }
}

export { DeleteVagaUseCase }
