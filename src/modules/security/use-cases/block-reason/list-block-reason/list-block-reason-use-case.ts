import { inject, injectable } from 'tsyringe'
import { BlockReason } from '@modules/security/infra/typeorm/entities/block-reason'
import { IBlockReasonRepository } from '@modules/security/repositories/i-block-reason-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  columnOrder: Array<'ASC' | 'DESC'>
}

@injectable()
class ListBlockReasonUseCase {
  constructor(@inject('BlockReasonRepository')
    private blockReasonRepository: IBlockReasonRepository
  ) {}

  async execute({
    search,
    page,
    rowsPerPage,
    columnOrder
  }: IRequest): Promise<HttpResponse> {
    const blockReasons = await this.blockReasonRepository.list(
      search,
      page,
      rowsPerPage,
      columnOrder
    )

    return blockReasons
  }
}

export { ListBlockReasonUseCase }
