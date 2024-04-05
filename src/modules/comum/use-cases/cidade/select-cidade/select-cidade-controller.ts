import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectCidadeUseCase } from './select-cidade-use-case'
import { ok } from '@shared/helpers'

class SelectCidadeController {
  async handle(request: Request, response: Response): Promise<Response> {

    const selectCidadeUseCase = container.resolve(SelectCidadeUseCase)

    const result = await selectCidadeUseCase.execute()
      .then(cidadesResult => {
        return ok(cidadesResult)
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { SelectCidadeController }
