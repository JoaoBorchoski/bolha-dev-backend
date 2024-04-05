import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectEstadoUseCase } from './select-estado-use-case'
import { ok } from '@shared/helpers'

class SelectEstadoController {
  async handle(request: Request, response: Response): Promise<Response> {

    const selectEstadoUseCase = container.resolve(SelectEstadoUseCase)

    const result = await selectEstadoUseCase.execute()
      .then(estadosResult => {
        return ok(estadosResult)
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { SelectEstadoController }
