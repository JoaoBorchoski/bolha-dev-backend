import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListBlockReasonUseCase } from './list-block-reason-use-case'
import { HttpResponse } from '@shared/helpers'

class ListBlockReasonController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      rowsPerPage,
      columnOrder
    } = request.body

    const listBlockReasonUseCase = container.resolve(ListBlockReasonUseCase)

    const blockReasons = await listBlockReasonUseCase.execute({
      search: search as string,
      page: page as number,
      rowsPerPage: rowsPerPage as number,
      columnOrder: columnOrder as Array<'ASC' | 'DESC'>
    })

    return response.json(blockReasons)
  }
}

export { ListBlockReasonController }
