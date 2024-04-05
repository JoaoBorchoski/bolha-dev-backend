import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetCepUseCase } from './get-cep-use-case'
import { ok } from '@shared/helpers'

class GetCepController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id

    const getCepUseCase = container.resolve(GetCepUseCase)

    const result = await getCepUseCase.execute(id)
      .then(cepResult => {
        return ok(cepResult)
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { GetCepController }
