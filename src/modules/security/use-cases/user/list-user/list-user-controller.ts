import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListUserUseCase } from './list-user-use-case'
import { HttpResponse } from '@shared/helpers'

class ListUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      rowsPerPage,
      columnOrder
    } = request.body

    const listUserUseCase = container.resolve(ListUserUseCase)

    const users = await listUserUseCase.execute({
      search: search as string,
      page: page as number,
      rowsPerPage: rowsPerPage as number,
      columnOrder: columnOrder as Array<'ASC' | 'DESC'>
    })

    return response.json(users)
  }
}

export { ListUserController }
