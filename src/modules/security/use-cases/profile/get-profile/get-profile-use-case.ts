import { inject, injectable } from 'tsyringe'
import { Profile } from '@modules/security/infra/typeorm/entities/profile'
import { IProfileRepository } from '@modules/security/repositories/i-profile-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class GetProfileUseCase {
  constructor(@inject('ProfileRepository')
    private profileRepository: IProfileRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const profile = await this.profileRepository.get(id)

    return profile
  }
}

export { GetProfileUseCase }
