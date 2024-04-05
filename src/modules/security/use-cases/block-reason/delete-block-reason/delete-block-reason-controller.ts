import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteBlockReasonUseCase } from './delete-block-reason-use-case'
import { ListBlockReasonUseCase } from '../list-block-reason/list-block-reason-use-case'
import { HttpResponse } from '@shared/helpers'

class DeleteBlockReasonController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteBlockReasonUseCase = container.resolve(DeleteBlockReasonUseCase)
    await deleteBlockReasonUseCase.execute(id)


    // restore list with updated records

    const listBlockReasonUseCase = container.resolve(ListBlockReasonUseCase)
    const blockReasons = await listBlockReasonUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      columnOrder: []
    })

    return response.json(blockReasons)
  }
}

export { DeleteBlockReasonController }
