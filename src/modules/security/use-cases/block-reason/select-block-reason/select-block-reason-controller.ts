import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectBlockReasonUseCase } from './select-block-reason-use-case'
import { HttpResponse } from '@shared/helpers'

class SelectBlockReasonController {
  async handle(request: Request, response: Response): Promise<Response> {
    const selectBlockReasonUseCase = container.resolve(SelectBlockReasonUseCase)

    const blockReasons = await selectBlockReasonUseCase.execute()

    return response.json(blockReasons)
  }
}

export { SelectBlockReasonController }
