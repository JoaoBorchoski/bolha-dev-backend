import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteEstadoUseCase } from './delete-estado-use-case'
import { ok } from '@shared/helpers'

class DeleteEstadoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id

    const deleteEstadoUseCase = container.resolve(DeleteEstadoUseCase)

    const result = await deleteEstadoUseCase.execute(id)
      .then(estadosResult => {
        return ok(estadosResult)
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { DeleteEstadoController }
