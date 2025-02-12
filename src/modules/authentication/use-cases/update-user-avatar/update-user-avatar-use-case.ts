import { inject, injectable } from 'tsyringe'
import { IUserRepository } from '@modules/authentication/repositories/i-user-repository'
import { IStorageProvider } from '@shared/container/providers/storage-provider/i-storage-provider'
import { HttpResponse, ok, serverError } from '@shared/helpers'

interface IRequest {
  userId: string
  avatarFile: string
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(@inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  async execute({ userId, avatarFile }: IRequest): Promise<HttpResponse> {
    try {
      const user = await this.userRepository.findById(userId)
  
      if (user.avatar) {
        await this.storageProvider.delete(user.avatar, 'avatar')
      }
      await this.storageProvider.save(avatarFile, 'avatar')
  
      user.avatar = avatarFile
  
      await this.userRepository.create(user)

      const avatarUrl = `${this.storageProvider.url}/${avatarFile}`

      return ok(avatarUrl)
    } catch (err) {
      return serverError(err)
    }
  }
}

export { UpdateUserAvatarUseCase }
