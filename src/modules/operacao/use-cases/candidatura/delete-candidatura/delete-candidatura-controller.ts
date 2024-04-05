import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteCandidaturaUseCase } from './delete-candidatura-use-case'
import { ok } from '@shared/helpers'

class DeleteCandidaturaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id

    const deleteCandidaturaUseCase = container.resolve(DeleteCandidaturaUseCase)

    const result = await deleteCandidaturaUseCase.execute(id)
      .then(candidaturasResult => {
        return ok(candidaturasResult)
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { DeleteCandidaturaController }
