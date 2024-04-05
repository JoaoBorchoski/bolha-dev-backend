import { inject, injectable } from 'tsyringe'
import { Cidade } from '@modules/comum/infra/typeorm/entities/cidade'
import { ICidadeRepository } from '@modules/comum/repositories/i-cidade-repository'

@injectable()
class DeleteCidadeUseCase {
  constructor(@inject('CidadeRepository')
    private cidadeRepository: ICidadeRepository
  ) {}

  async execute(id: string): Promise<Cidade[]> {
    try {
      await this.cidadeRepository.delete(id)

      const cidades= await this.cidadeRepository.list('', 0, 100, [])
  
      return cidades
    } catch (err) {
      throw err
    }
  }
}

export { DeleteCidadeUseCase }
