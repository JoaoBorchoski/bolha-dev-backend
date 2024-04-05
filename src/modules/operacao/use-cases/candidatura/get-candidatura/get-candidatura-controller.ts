import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetCandidaturaUseCase } from './get-candidatura-use-case'
import { ok } from '@shared/helpers'

class GetCandidaturaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id

    const getCandidaturaUseCase = container.resolve(GetCandidaturaUseCase)

    const result = await getCandidaturaUseCase.execute(id)
      .then(candidaturaResult => {
        return ok(candidaturaResult)
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { GetCandidaturaController }
