import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateBlockReasonUseCase } from './update-block-reason-use-case'

class UpdateBlockReasonController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      id,
      code,
      description,
      instructionsToSolve,
      isSolvedByPasswordReset
    } = request.body

    const updateBlockReasonUseCase = container.resolve(UpdateBlockReasonUseCase)

    const result = await updateBlockReasonUseCase.execute({
        id,
        code,
        description,
        instructionsToSolve,
        isSolvedByPasswordReset
      })
      .then(blockReasonResult => {
        return blockReasonResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { UpdateBlockReasonController }
