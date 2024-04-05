import { inject, injectable } from 'tsyringe'
import { BlockReason } from '@modules/security/infra/typeorm/entities/block-reason'
import { IBlockReasonRepository } from '@modules/security/repositories/i-block-reason-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class SelectBlockReasonUseCase {
  constructor(@inject('BlockReasonRepository')
    private blockReasonRepository: IBlockReasonRepository
  ) {}

  async execute(): Promise<HttpResponse> {
    const blockReasons = await this.blockReasonRepository.select()

    return blockReasons
  }
}

export { SelectBlockReasonUseCase }
