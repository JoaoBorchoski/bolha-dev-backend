import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountEstadoUseCase } from './count-estado-use-case'
import { ok } from '@shared/helpers'

class CountEstadoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      search
    } = request.body


    const countEstadoUseCase = container.resolve(CountEstadoUseCase)

    const result = await countEstadoUseCase.execute({
        search: search as string
      })
      .then(estadosCountResult => {
        return ok(estadosCountResult)
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CountEstadoController }
