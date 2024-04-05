import { inject, injectable } from 'tsyringe'
import { UserGroup } from '@modules/security/infra/typeorm/entities/user-group'
import { IUserGroupRepository } from '@modules/security/repositories/i-user-group-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  columnOrder: Array<'ASC' | 'DESC'>
}

@injectable()
class ListUserGroupUseCase {
  constructor(@inject('UserGroupRepository')
    private userGroupRepository: IUserGroupRepository
  ) {}

  async execute({
    search,
    page,
    rowsPerPage,
    columnOrder
  }: IRequest): Promise<HttpResponse> {
    const userGroups = await this.userGroupRepository.list(
      search,
      page,
      rowsPerPage,
      columnOrder
    )

    return userGroups
  }
}

export { ListUserGroupUseCase }
