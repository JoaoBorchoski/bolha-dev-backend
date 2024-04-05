import { hash } from 'bcrypt'
import { inject, injectable } from 'tsyringe'
import { IUserDTO } from '@modules/authentication/dtos/i-user-dto'
import { IUserRepository } from '@modules/authentication/repositories/i-user-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse, noContent, notFound, serverError } from '@shared/helpers'

interface IUserData {
  id: string
  name: string
  password?: string
}

@injectable()
class UpdateUserUseCase {
  constructor(@inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  async execute({
    id,
    name,
    password
  }: IUserDTO): Promise<HttpResponse> {
    const userExists = await this.userRepository.findById(id)

    if (!userExists) {
      return notFound()
    }

    const userData: IUserData = {
      id,
      name
    }

    if (password && password.length >= 5) {
      userData.password = await hash(password, 8)
    }

    try {
      await this.userRepository.update(userData)

      return noContent()
    } catch (err) {
      return serverError(err)
    }
  }
}

export { UpdateUserUseCase }
