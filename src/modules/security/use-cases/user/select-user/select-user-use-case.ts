import { inject, injectable } from 'tsyringe'
import { User } from '@modules/security/infra/typeorm/entities/user'
import { IUserSecurityRepository } from '@modules/security/repositories/i-user-security-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  isAdmin: boolean, 
  isSuperUser: boolean, 
  userGroupId: string
}

@injectable()
class SelectUserUseCase {
  constructor(@inject('UserSecurityRepository')
    private userSecurityRepository: IUserSecurityRepository
  ) {}

  async execute({
    isAdmin, 
    isSuperUser, 
    userGroupId
  }: IRequest): Promise<HttpResponse> {
    const users = await this.userSecurityRepository.select(
      isAdmin, 
      isSuperUser, 
      userGroupId
    )

    return users
  }
}

export { SelectUserUseCase }
