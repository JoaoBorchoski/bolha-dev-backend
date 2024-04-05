import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateUserUseCase } from './update-user-use-case'

class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      id,
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

    const updateUserUseCase = container.resolve(UpdateUserUseCase)

    const result = await updateUserUseCase.execute({
        id,
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

export { UpdateUserController }
