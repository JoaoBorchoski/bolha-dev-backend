import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountCandidaturaUseCase } from './count-candidatura-use-case'
import { ok } from '@shared/helpers'

class CountCandidaturaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      search
    } = request.body

    const { id: userId } = request.user

    const countCandidaturaUseCase = container.resolve(CountCandidaturaUseCase)

    const result = await countCandidaturaUseCase.execute({
        userId: userId as string,
        search: search as string
      })
      .then(candidaturasCountResult => {
        return ok(candidaturasCountResult)
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CountCandidaturaController }
