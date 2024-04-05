import { inject, injectable } from 'tsyringe'
import { Profile } from '@modules/security/infra/typeorm/entities/profile'
import { IProfileRepository } from '@modules/security/repositories/i-profile-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  columnOrder: Array<'ASC' | 'DESC'>
}

@injectable()
class ListProfileUseCase {
  constructor(@inject('ProfileRepository')
    private profileRepository: IProfileRepository
  ) {}

  async execute({
    search,
    page,
    rowsPerPage,
    columnOrder
  }: IRequest): Promise<HttpResponse> {
    const profiles = await this.profileRepository.list(
      search,
      page,
      rowsPerPage,
      columnOrder
    )

    return profiles
  }
}

export { ListProfileUseCase }
