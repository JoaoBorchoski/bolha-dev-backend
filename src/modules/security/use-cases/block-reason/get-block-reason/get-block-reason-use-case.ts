import { inject, injectable } from 'tsyringe'
import { BlockReason } from '@modules/security/infra/typeorm/entities/block-reason'
import { IBlockReasonRepository } from '@modules/security/repositories/i-block-reason-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class GetBlockReasonUseCase {
  constructor(@inject('BlockReasonRepository')
    private blockReasonRepository: IBlockReasonRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const blockReason = await this.blockReasonRepository.get(id)

    return blockReason
  }
}

export { GetBlockReasonUseCase }
