import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateUserUseCase } from './update-user-use-case'

class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, password } = request.body

    const { id } = request.user

    const updateUserUseCase = container.resolve(UpdateUserUseCase)

    const updateUserResponse = await updateUserUseCase.execute({
      id,
      name,
      password
    })

    return response.status(updateUserResponse.statusCode).send(updateUserResponse)
  }
}

export { UpdateUserController }
