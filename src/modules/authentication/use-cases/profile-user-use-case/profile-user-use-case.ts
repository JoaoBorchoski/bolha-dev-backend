import { inject, injectable } from 'tsyringe'
import { IUserRepository } from '@modules/authentication/repositories/i-user-repository'
import { UserMap } from '@modules/authentication/mapper/user-map'
import { HttpResponse, ok } from '@shared/helpers'

@injectable()
class ProfileUserUseCase {
  constructor(@inject('UserRepository')
    private userRepository: IUserRepository
  ) {}
  async execute(id: string): Promise<HttpResponse> {
    const user = await this.userRepository.findById(id)

    return ok(UserMap.toDTO(user))
  }
}

export { ProfileUserUseCase }
