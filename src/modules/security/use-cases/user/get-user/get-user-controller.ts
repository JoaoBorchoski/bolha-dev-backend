import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetUserUseCase } from './get-user-use-case'
import { HttpResponse } from '@shared/helpers'

class GetUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getUserUseCase = container.resolve(GetUserUseCase)
    const user = await getUserUseCase.execute(id)

    return response.status(user.statusCode).json(user)
  }
}

export { GetUserController }
