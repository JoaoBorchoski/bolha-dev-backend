import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectVagaUseCase } from './select-vaga-use-case'
import { ok } from '@shared/helpers'

class SelectVagaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user

    const selectVagaUseCase = container.resolve(SelectVagaUseCase)

    const result = await selectVagaUseCase.execute(userId)
      .then(vagasResult => {
        return ok(vagasResult)
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { SelectVagaController }
