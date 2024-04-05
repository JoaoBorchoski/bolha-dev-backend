import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListProfileOptionUseCase } from './list-profile-option-use-case'
import { HttpResponse } from '@shared/helpers'

class ListProfileOptionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      rowsPerPage,
      columnOrder
    } = request.body

    const listProfileOptionUseCase = container.resolve(ListProfileOptionUseCase)

    const profileOptions = await listProfileOptionUseCase.execute({
      search: search as string,
      page: page as number,
      rowsPerPage: rowsPerPage as number,
      columnOrder: columnOrder as Array<'ASC' | 'DESC'>
    })

    return response.json(profileOptions)
  }
}

export { ListProfileOptionController }
