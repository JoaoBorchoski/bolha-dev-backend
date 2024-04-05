import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectNavigationUseCase } from './select-navigation-use-case'
import { HttpResponse } from '@shared/helpers'

class SelectNavigationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const selectNavigationUseCase = container.resolve(SelectNavigationUseCase)

    const navigations = await selectNavigationUseCase.execute()

    return response.json(navigations)
  }
}

export { SelectNavigationController }
