import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountPaisUseCase } from './count-pais-use-case'
import { ok } from '@shared/helpers'

class CountPaisController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      search
    } = request.body


    const countPaisUseCase = container.resolve(CountPaisUseCase)

    const result = await countPaisUseCase.execute({
        search: search as string
      })
      .then(paisesCountResult => {
        return ok(paisesCountResult)
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CountPaisController }
