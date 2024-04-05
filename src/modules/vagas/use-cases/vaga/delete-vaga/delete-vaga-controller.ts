import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteVagaUseCase } from './delete-vaga-use-case'
import { ok } from '@shared/helpers'

class DeleteVagaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id

    const deleteVagaUseCase = container.resolve(DeleteVagaUseCase)

    const result = await deleteVagaUseCase.execute(id)
      .then(vagasResult => {
        return ok(vagasResult)
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { DeleteVagaController }
