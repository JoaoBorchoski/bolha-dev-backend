import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateVagaUseCase } from './update-vaga-use-case'
import { ok } from '@shared/helpers'

class UpdateVagaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      id,
      nomeVaga,
      paisId,
      estadoId,
      cidadeId,
      descricao,
      numeroCandidaturas,
      desabilitado
    } = request.body

    const { id: userId } = request.user

    const updateVagaUseCase = container.resolve(UpdateVagaUseCase)

    const result = await updateVagaUseCase.execute({
        userId,
        id,
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

export { UpdateVagaController }
