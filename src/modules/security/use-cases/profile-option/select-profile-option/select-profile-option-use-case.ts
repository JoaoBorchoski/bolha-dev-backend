import { inject, injectable } from 'tsyringe'
import { ProfileOption } from '@modules/security/infra/typeorm/entities/profile-option'
import { IProfileOptionRepository } from '@modules/security/repositories/i-profile-option-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class SelectProfileOptionUseCase {
  constructor(@inject('ProfileOptionRepository')
    private profileOptionRepository: IProfileOptionRepository
  ) {}

  async execute(): Promise<HttpResponse> {
    const profileOptions = await this.profileOptionRepository.select()

    return profileOptions
  }
}

export { SelectProfileOptionUseCase }
