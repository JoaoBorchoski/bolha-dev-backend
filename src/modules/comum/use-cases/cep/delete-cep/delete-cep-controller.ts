import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteCepUseCase } from './delete-cep-use-case'
import { ok } from '@shared/helpers'

class DeleteCepController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id

    const deleteCepUseCase = container.resolve(DeleteCepUseCase)

    const result = await deleteCepUseCase.execute(id)
      .then(cepsResult => {
        return ok(cepsResult)
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { DeleteCepController }
