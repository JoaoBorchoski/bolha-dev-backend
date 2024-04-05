import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountCepUseCase } from './count-cep-use-case'
import { ok } from '@shared/helpers'

class CountCepController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      search
    } = request.body


    const countCepUseCase = container.resolve(CountCepUseCase)

    const result = await countCepUseCase.execute({
        search: search as string
      })
      .then(cepsCountResult => {
        return ok(cepsCountResult)
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CountCepController }
