import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdatePaisUseCase } from './update-pais-use-case'
import { ok } from '@shared/helpers'

class UpdatePaisController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      id,
      codigoPais,
      nomePais
    } = request.body


    const updatePaisUseCase = container.resolve(UpdatePaisUseCase)

    const result = await updatePaisUseCase.execute({
        id,
        codigoPais,
        nomePais
      })
      .then(paisResult => {
        return ok(paisResult)
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { UpdatePaisController }
