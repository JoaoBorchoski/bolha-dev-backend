import { inject, injectable } from 'tsyringe'
import { Profile } from '@modules/security/infra/typeorm/entities/profile'
import { IProfileRepository } from '@modules/security/repositories/i-profile-repository'
import { IProfileOptionDTO } from '@modules/security/dtos/i-profile-option-dto'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  userGroupId: string
  name: string
  disabled: boolean
  menuOptions: IProfileOptionDTO[]
}

@injectable()
class CreateProfileUseCase {
  constructor(@inject('ProfileRepository')
    private profileRepository: IProfileRepository
  ) {}

  async execute({
    userGroupId,
    name,
    disabled,
    menuOptions
  }: IRequest): Promise<Profile> {
    const result = await this.profileRepository.create({
        userGroupId,
        name,
        disabled,
        menuOptions
      })
      .then(profileResult => {
        return profileResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateProfileUseCase }
