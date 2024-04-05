import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectMenuOptionUseCase } from './select-menu-option-use-case'
import { HttpResponse } from '@shared/helpers'

class SelectMenuOptionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const selectMenuOptionUseCase = container.resolve(SelectMenuOptionUseCase)

    const menuOptions = await selectMenuOptionUseCase.execute()

    return response.json(menuOptions)
  }
}

export { SelectMenuOptionController }
