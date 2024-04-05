import { inject, injectable } from 'tsyringe'
import { Cep } from '@modules/comum/infra/typeorm/entities/cep'
import { ICepRepository } from '@modules/comum/repositories/i-cep-repository'

@injectable()
class DeleteCepUseCase {
  constructor(@inject('CepRepository')
    private cepRepository: ICepRepository
  ) {}

  async execute(id: string): Promise<Cep[]> {
    try {
      await this.cepRepository.delete(id)

      const ceps= await this.cepRepository.list('', 0, 100, [])
  
      return ceps
    } catch (err) {
      throw err
    }
  }
}

export { DeleteCepUseCase }
