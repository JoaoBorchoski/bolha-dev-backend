import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeletePaisUseCase } from './delete-pais-use-case'
import { ok } from '@shared/helpers'

class DeletePaisController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id

    const deletePaisUseCase = container.resolve(DeletePaisUseCase)

    const result = await deletePaisUseCase.execute(id)
      .then(paisesResult => {
        return ok(paisesResult)
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { DeletePaisController }
