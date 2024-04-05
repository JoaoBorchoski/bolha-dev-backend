import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountCidadeUseCase } from './count-cidade-use-case'
import { ok } from '@shared/helpers'

class CountCidadeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      search
    } = request.body


    const countCidadeUseCase = container.resolve(CountCidadeUseCase)

    const result = await countCidadeUseCase.execute({
        search: search as string
      })
      .then(cidadesCountResult => {
        return ok(cidadesCountResult)
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CountCidadeController }
