import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateCidadeUseCase } from './update-cidade-use-case'
import { ok } from '@shared/helpers'

class UpdateCidadeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      id,
      estadoId,
      codigoIbge,
      nomeCidade
    } = request.body


    const updateCidadeUseCase = container.resolve(UpdateCidadeUseCase)

    const result = await updateCidadeUseCase.execute({
        id,
        estadoId,
        codigoIbge,
        nomeCidade
      })
      .then(cidadeResult => {
        return ok(cidadeResult)
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { UpdateCidadeController }
