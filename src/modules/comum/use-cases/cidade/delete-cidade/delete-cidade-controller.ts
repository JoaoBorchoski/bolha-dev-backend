import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteCidadeUseCase } from './delete-cidade-use-case'
import { ok } from '@shared/helpers'

class DeleteCidadeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id

    const deleteCidadeUseCase = container.resolve(DeleteCidadeUseCase)

    const result = await deleteCidadeUseCase.execute(id)
      .then(cidadesResult => {
        return ok(cidadesResult)
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { DeleteCidadeController }
