import { inject, injectable } from 'tsyringe'
import { UserProfile } from '@modules/security/infra/typeorm/entities/user-profile'
import { IUserProfileRepository } from '@modules/security/repositories/i-user-profile-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  columnOrder: Array<'ASC' | 'DESC'>
}

@injectable()
class ListUserProfileUseCase {
  constructor(@inject('UserProfileRepository')
    private userProfileRepository: IUserProfileRepository
  ) {}

  async execute({
    search,
    page,
    rowsPerPage,
    columnOrder
  }: IRequest): Promise<HttpResponse> {
    const usersProfiles = await this.userProfileRepository.list(
      search,
      page,
      rowsPerPage,
      columnOrder
    )

    return usersProfiles
  }
}

export { ListUserProfileUseCase }
