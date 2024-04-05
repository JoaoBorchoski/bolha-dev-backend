import { inject, injectable } from 'tsyringe'
import { UserGroup } from '@modules/security/infra/typeorm/entities/user-group'
import { IUserGroupRepository } from '@modules/security/repositories/i-user-group-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class SelectUserGroupUseCase {
  constructor(@inject('UserGroupRepository')
    private userGroupRepository: IUserGroupRepository
  ) {}

  async execute(): Promise<HttpResponse> {
    const userGroups = await this.userGroupRepository.select()

    return userGroups
  }
}

export { SelectUserGroupUseCase }
