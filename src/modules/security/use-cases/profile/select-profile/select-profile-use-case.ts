import { inject, injectable } from 'tsyringe'
import { Profile } from '@modules/security/infra/typeorm/entities/profile'
import { IProfileRepository } from '@modules/security/repositories/i-profile-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class SelectProfileUseCase {
  constructor(@inject('ProfileRepository')
    private profileRepository: IProfileRepository
  ) {}

  async execute(): Promise<HttpResponse> {
    const profiles = await this.profileRepository.select()

    return profiles
  }
}

export { SelectProfileUseCase }
