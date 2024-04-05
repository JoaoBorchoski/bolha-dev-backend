import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectUserProfileUseCase } from './select-user-profile-use-case'
import { HttpResponse } from '@shared/helpers'

class SelectUserProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const selectUserProfileUseCase = container.resolve(SelectUserProfileUseCase)

    const usersProfiles = await selectUserProfileUseCase.execute()

    return response.json(usersProfiles)
  }
}

export { SelectUserProfileController }
