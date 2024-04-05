import { inject, injectable } from 'tsyringe'
import { User } from '@modules/security/infra/typeorm/entities/user'
import { IUserSecurityRepository } from '@modules/security/repositories/i-user-security-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
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
class CreateUserUseCase {
  constructor(@inject('UserSecurityRepository')
    private userSecurityRepository: IUserSecurityRepository
  ) {}

  async execute({
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
  }: IRequest): Promise<User> {
    const result = await this.userSecurityRepository.create({
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
      .then(userResult => {
        return userResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateUserUseCase }
