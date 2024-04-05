import { inject, injectable } from 'tsyringe'
import { ICepSelectDTO } from '@modules/comum/dtos/i-cep-dto'
import { ICepRepository } from '@modules/comum/repositories/i-cep-repository'

@injectable()
class SelectCepUseCase {
  constructor(@inject('CepRepository')
    private cepRepository: ICepRepository
  ) {}

  async execute(): Promise<ICepSelectDTO[]> {
    try {
      const ceps = await this.cepRepository.select()

      return ceps
    } catch (err) {
      throw err
    }
  }
}

export { SelectCepUseCase }
