import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectCepUseCase } from './select-cep-use-case'
import { ok } from '@shared/helpers'

class SelectCepController {
  async handle(request: Request, response: Response): Promise<Response> {

    const selectCepUseCase = container.resolve(SelectCepUseCase)

    const result = await selectCepUseCase.execute()
      .then(cepsResult => {
        return ok(cepsResult)
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { SelectCepController }
