import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetEstadoUseCase } from './get-estado-use-case'
import { ok } from '@shared/helpers'

class GetEstadoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id

    const getEstadoUseCase = container.resolve(GetEstadoUseCase)

    const result = await getEstadoUseCase.execute(id)
      .then(estadoResult => {
        return ok(estadoResult)
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { GetEstadoController }
