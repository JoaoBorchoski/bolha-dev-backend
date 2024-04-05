import { inject, injectable } from 'tsyringe'
import { BlockReason } from '@modules/security/infra/typeorm/entities/block-reason'
import { IBlockReasonRepository } from '@modules/security/repositories/i-block-reason-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  code: string
  description: string
  instructionsToSolve: string
  isSolvedByPasswordReset: boolean
}

@injectable()
class UpdateBlockReasonUseCase {
  constructor(@inject('BlockReasonRepository')
    private blockReasonRepository: IBlockReasonRepository
  ) {}

  async execute({
    id,
    code,
    description,
    instructionsToSolve,
    isSolvedByPasswordReset
  }: IRequest): Promise<HttpResponse> {
    const blockReason = await this.blockReasonRepository.update({
      id,
      code,
      description,
      instructionsToSolve,
      isSolvedByPasswordReset
    })

    return blockReason
  }
}

export { UpdateBlockReasonUseCase }
