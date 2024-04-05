import { inject, injectable } from 'tsyringe'
import { ProfileOption } from '@modules/security/infra/typeorm/entities/profile-option'
import { IProfileOptionRepository } from '@modules/security/repositories/i-profile-option-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  columnOrder: Array<'ASC' | 'DESC'>
}

@injectable()
class ListProfileOptionUseCase {
  constructor(@inject('ProfileOptionRepository')
    private profileOptionRepository: IProfileOptionRepository
  ) {}

  async execute({
    search,
    page,
    rowsPerPage,
    columnOrder
  }: IRequest): Promise<HttpResponse> {
    const profileOptions = await this.profileOptionRepository.list(
      search,
      page,
      rowsPerPage,
      columnOrder
    )

    return profileOptions
  }
}

export { ListProfileOptionUseCase }
