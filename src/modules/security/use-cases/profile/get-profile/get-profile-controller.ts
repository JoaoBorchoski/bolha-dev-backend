import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetProfileUseCase } from './get-profile-use-case'
import { HttpResponse } from '@shared/helpers'

class GetProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getProfileUseCase = container.resolve(GetProfileUseCase)
    const profile = await getProfileUseCase.execute(id)

    return response.status(profile.statusCode).json(profile)
  }
}

export { GetProfileController }
