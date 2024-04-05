import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectProfileUseCase } from './select-profile-use-case'
import { HttpResponse } from '@shared/helpers'

class SelectProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const selectProfileUseCase = container.resolve(SelectProfileUseCase)

    const profiles = await selectProfileUseCase.execute()

    return response.json(profiles)
  }
}

export { SelectProfileController }
