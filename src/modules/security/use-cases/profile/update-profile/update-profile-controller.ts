import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateProfileUseCase } from './update-profile-use-case'

class UpdateProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      id,
      name,
      disabled,
      menuOptions
    } = request.body

    const updateProfileUseCase = container.resolve(UpdateProfileUseCase)

    const result = await updateProfileUseCase.execute({
        id,
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

    return response.status(result.statusCode).json(result)
  }
}

export { UpdateProfileController }
