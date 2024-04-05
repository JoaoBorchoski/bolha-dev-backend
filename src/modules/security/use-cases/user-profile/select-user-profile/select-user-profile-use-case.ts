import { inject, injectable } from 'tsyringe'
import { UserProfile } from '@modules/security/infra/typeorm/entities/user-profile'
import { IUserProfileRepository } from '@modules/security/repositories/i-user-profile-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class SelectUserProfileUseCase {
  constructor(@inject('UserProfileRepository')
    private userProfileRepository: IUserProfileRepository
  ) {}

  async execute(): Promise<HttpResponse> {
    const usersProfiles = await this.userProfileRepository.select()

    return usersProfiles
  }
}

export { SelectUserProfileUseCase }
