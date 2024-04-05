import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetPaisUseCase } from './get-pais-use-case'
import { ok } from '@shared/helpers'

class GetPaisController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id

    const getPaisUseCase = container.resolve(GetPaisUseCase)

    const result = await getPaisUseCase.execute(id)
      .then(paisResult => {
        return ok(paisResult)
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { GetPaisController }
