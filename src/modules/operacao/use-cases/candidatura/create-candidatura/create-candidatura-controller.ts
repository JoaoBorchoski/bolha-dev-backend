import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateCandidaturaUseCase } from './create-candidatura-use-case'
import { ok } from '@shared/helpers'

class CreateCandidaturaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      cep,
      paisId,
      estadoId,
      cidadeId,
      descricao
    } = request.body

    const { id: userId } = request.user

    const createCandidaturaUseCase = container.resolve(CreateCandidaturaUseCase)

    const result = await createCandidaturaUseCase.execute({
        userId,
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

export { CreateCandidaturaController }
