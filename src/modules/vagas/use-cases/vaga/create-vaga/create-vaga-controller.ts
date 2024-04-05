import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateVagaUseCase } from './create-vaga-use-case'
import { ok } from '@shared/helpers'

class CreateVagaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      nomeVaga,
      paisId,
      estadoId,
      cidadeId,
      descricao,
      numeroCandidaturas,
      desabilitado
    } = request.body

    const { id: userId } = request.user

    const createVagaUseCase = container.resolve(CreateVagaUseCase)

    const result = await createVagaUseCase.execute({
        userId,
        nomeVaga,
        paisId,
        estadoId,
        cidadeId,
        descricao,
        numeroCandidaturas,
        desabilitado
      })
      .then(vagaResult => {
        return ok(vagaResult)
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateVagaController }
