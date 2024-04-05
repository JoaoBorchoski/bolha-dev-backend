import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetVagaUseCase } from './get-vaga-use-case'
import { ok } from '@shared/helpers'

class GetVagaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id

    const getVagaUseCase = container.resolve(GetVagaUseCase)

    const result = await getVagaUseCase.execute(id)
      .then(vagaResult => {
        return ok(vagaResult)
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { GetVagaController }
