import { inject, injectable } from 'tsyringe'
import { User } from '@modules/security/infra/typeorm/entities/user'
import { IUserSecurityRepository } from '@modules/security/repositories/i-user-security-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  userGroupId: string
  name: string
  email: string
  password: string
  isAdmin: boolean
  isSuperUser: boolean
  isBlocked: boolean
  blockReasonId: string
  mustChangePasswordNextLogon: boolean
  isDisabled: boolean
  avatar: string
}

@injectable()
class UpdateUserUseCase {
  constructor(@inject('UserSecurityRepository')
    private userSecurityRepository: IUserSecurityRepository
  ) {}

  async execute({
    id,
    userGroupId,
    name,
    email,
    password,
    isAdmin,
    isSuperUser,
    isBlocked,
    blockReasonId,
    mustChangePasswordNextLogon,
    isDisabled,
    avatar
  }: IRequest): Promise<HttpResponse> {
    const user = await this.userSecurityRepository.update({
      id,
      userGroupId,
      name,
      email,
      password,
      isAdmin,
      isSuperUser,
      isBlocked,
      blockReasonId,
      mustChangePasswordNextLogon,
      isDisabled,
      avatar
    })

    return user
  }
}

export { UpdateUserUseCase }
