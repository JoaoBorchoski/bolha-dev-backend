import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectCandidaturaUseCase } from './select-candidatura-use-case'
import { ok } from '@shared/helpers'

class SelectCandidaturaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user

    const selectCandidaturaUseCase = container.resolve(SelectCandidaturaUseCase)

    const result = await selectCandidaturaUseCase.execute(userId)
      .then(candidaturasResult => {
        return ok(candidaturasResult)
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { SelectCandidaturaController }
