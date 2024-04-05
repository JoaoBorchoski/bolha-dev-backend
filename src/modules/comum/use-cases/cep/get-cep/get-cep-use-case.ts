import { inject, injectable } from 'tsyringe'
import { Cep } from '@modules/comum/infra/typeorm/entities/cep'
import { ICepRepository } from '@modules/comum/repositories/i-cep-repository'

@injectable()
class GetCepUseCase {
  constructor(@inject('CepRepository')
    private cepRepository: ICepRepository
  ) {}

  async execute(id: string): Promise<Cep> {
    try {
      const cep = await this.cepRepository.get(id)
  
      return cep
    } catch (err) {
      throw err
    }
  }
}

export { GetCepUseCase }
