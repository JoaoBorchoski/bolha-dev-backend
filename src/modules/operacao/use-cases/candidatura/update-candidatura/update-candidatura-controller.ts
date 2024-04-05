import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateCandidaturaUseCase } from './update-candidatura-use-case'
import { ok } from '@shared/helpers'

class UpdateCandidaturaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      id,
      nome,
      cep,
      paisId,
      estadoId,
      cidadeId,
      descricao
    } = request.body

    const { id: userId } = request.user

    const updateCandidaturaUseCase = container.resolve(UpdateCandidaturaUseCase)

    const result = await updateCandidaturaUseCase.execute({
        userId,
        id,
        nome,
        cep,
        paisId,
        estadoId,
        cidadeId,
        descricao
      })
      .then(candidaturaResult => {
        return ok(candidaturaResult)
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { UpdateCandidaturaController }
