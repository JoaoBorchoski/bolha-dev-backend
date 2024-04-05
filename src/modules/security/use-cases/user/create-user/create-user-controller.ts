import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateUserUseCase } from './create-user-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      userGroupId,
      name,
      email,
      password,
      isAdmin,
      isSuperUser,
      isBlocked,
      blockReasonId,
      mustChangePasswordNextLogon,
      isDisabled,
      avatar
    } = request.body

    const createUserUseCase = container.resolve(CreateUserUseCase)

    const result = await createUserUseCase.execute({
        userGroupId,
        name,
        email,
        password,
        isAdmin,
        isSuperUser,
        isBlocked,
        blockReasonId,
        mustChangePasswordNextLogon,
        isDisabled,
        avatar
      })
      .then(userResult => {
        return userResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateUserController }
