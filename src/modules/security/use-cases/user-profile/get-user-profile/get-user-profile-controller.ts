import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetUserProfileUseCase } from './get-user-profile-use-case'
import { HttpResponse } from '@shared/helpers'

class GetUserProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getUserProfileUseCase = container.resolve(GetUserProfileUseCase)
    const userProfile = await getUserProfileUseCase.execute(id)

    return response.status(userProfile.statusCode).json(userProfile)
  }
}

export { GetUserProfileController }
