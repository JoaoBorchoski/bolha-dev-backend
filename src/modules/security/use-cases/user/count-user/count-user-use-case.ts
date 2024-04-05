import { inject, injectable } from 'tsyringe'
import { User } from '@modules/security/infra/typeorm/entities/user'
import { IUserSecurityRepository } from '@modules/security/repositories/i-user-security-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
}

@injectable()
class CountUserUseCase {
  constructor(@inject('UserSecurityRepository')
    private userSecurityRepository: IUserSecurityRepository
  ) {}

  async execute({
    search
  }: IRequest): Promise<HttpResponse> {
    const usersCount = await this.userSecurityRepository.count(search)

    return usersCount
  }
}

export { CountUserUseCase }
