import { inject, injectable } from 'tsyringe'
import { User } from '@modules/security/infra/typeorm/entities/user'
import { IUserSecurityRepository } from '@modules/security/repositories/i-user-security-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class GetUserUseCase {
  constructor(@inject('UserSecurityRepository')
    private userSecurityRepository: IUserSecurityRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const user = await this.userSecurityRepository.get(id)

    return user
  }
}

export { GetUserUseCase }
