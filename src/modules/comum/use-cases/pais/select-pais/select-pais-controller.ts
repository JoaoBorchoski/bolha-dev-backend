import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectPaisUseCase } from './select-pais-use-case'
import { ok } from '@shared/helpers'

class SelectPaisController {
  async handle(request: Request, response: Response): Promise<Response> {

    const selectPaisUseCase = container.resolve(SelectPaisUseCase)

    const result = await selectPaisUseCase.execute()
      .then(paisesResult => {
        return ok(paisesResult)
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { SelectPaisController }
