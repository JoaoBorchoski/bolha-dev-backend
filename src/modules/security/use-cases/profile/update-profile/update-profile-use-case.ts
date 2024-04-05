import { inject, injectable } from 'tsyringe'
import { Profile } from '@modules/security/infra/typeorm/entities/profile'
import { IProfileRepository } from '@modules/security/repositories/i-profile-repository'
import { IProfileOptionDTO } from '@modules/security/dtos/i-profile-option-dto'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  name: string
  disabled: boolean
  menuOptions: IProfileOptionDTO[]
}

@injectable()
class UpdateProfileUseCase {
  constructor(@inject('ProfileRepository')
    private profileRepository: IProfileRepository
  ) {}

  async execute({
    id,
    name,
    disabled,
    menuOptions
  }: IRequest): Promise<HttpResponse> {
    const profile = await this.profileRepository.update({
      id,
      name,
      disabled,
      menuOptions
    })

    return profile
  }
}

export { UpdateProfileUseCase }
