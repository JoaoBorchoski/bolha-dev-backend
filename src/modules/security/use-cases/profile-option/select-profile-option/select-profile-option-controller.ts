import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectProfileOptionUseCase } from './select-profile-option-use-case'
import { HttpResponse } from '@shared/helpers'

class SelectProfileOptionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const selectProfileOptionUseCase = container.resolve(SelectProfileOptionUseCase)

    const profileOptions = await selectProfileOptionUseCase.execute()

    return response.json(profileOptions)
  }
}

export { SelectProfileOptionController }
