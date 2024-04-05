import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListUserGroupUseCase } from './list-user-group-use-case'
import { HttpResponse } from '@shared/helpers'

class ListUserGroupController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      rowsPerPage,
      columnOrder
    } = request.body

    const listUserGroupUseCase = container.resolve(ListUserGroupUseCase)

    const userGroups = await listUserGroupUseCase.execute({
      search: search as string,
      page: page as number,
      rowsPerPage: rowsPerPage as number,
      columnOrder: columnOrder as Array<'ASC' | 'DESC'>
    })

    return response.json(userGroups)
  }
}

export { ListUserGroupController }
