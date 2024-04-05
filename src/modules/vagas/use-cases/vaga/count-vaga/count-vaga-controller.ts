import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountVagaUseCase } from './count-vaga-use-case'
import { ok } from '@shared/helpers'

class CountVagaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      search
    } = request.body

    const { id: userId } = request.user

    const countVagaUseCase = container.resolve(CountVagaUseCase)

    const result = await countVagaUseCase.execute({
        userId: userId as string,
        search: search as string
      })
      .then(vagasCountResult => {
        return ok(vagasCountResult)
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CountVagaController }
