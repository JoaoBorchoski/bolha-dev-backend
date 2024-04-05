import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetCidadeUseCase } from './get-cidade-use-case'
import { ok } from '@shared/helpers'

class GetCidadeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id

    const getCidadeUseCase = container.resolve(GetCidadeUseCase)

    const result = await getCidadeUseCase.execute(id)
      .then(cidadeResult => {
        return ok(cidadeResult)
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { GetCidadeController }
