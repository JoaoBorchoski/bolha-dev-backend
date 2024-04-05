import { inject, injectable } from 'tsyringe'
import { ICidadeSelectDTO } from '@modules/comum/dtos/i-cidade-dto'
import { ICidadeRepository } from '@modules/comum/repositories/i-cidade-repository'

@injectable()
class SelectCidadeUseCase {
  constructor(@inject('CidadeRepository')
    private cidadeRepository: ICidadeRepository
  ) {}

  async execute(): Promise<ICidadeSelectDTO[]> {
    try {
      const cidades = await this.cidadeRepository.select()

      return cidades
    } catch (err) {
      throw err
    }
  }
}

export { SelectCidadeUseCase }
