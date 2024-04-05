import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectModuleUseCase } from './select-module-use-case'
import { HttpResponse } from '@shared/helpers'

class SelectModuleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const selectModuleUseCase = container.resolve(SelectModuleUseCase)

    const modules = await selectModuleUseCase.execute()

    return response.json(modules)
  }
}

export { SelectModuleController }
