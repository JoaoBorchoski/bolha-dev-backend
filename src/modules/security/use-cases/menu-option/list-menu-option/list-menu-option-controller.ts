import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListMenuOptionUseCase } from './list-menu-option-use-case'
import { HttpResponse } from '@shared/helpers'

class ListMenuOptionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      rowsPerPage,
      columnOrder
    } = request.body

    const listMenuOptionUseCase = container.resolve(ListMenuOptionUseCase)

    const menuOptions = await listMenuOptionUseCase.execute({
      search: search as string,
      page: page as number,
      rowsPerPage: rowsPerPage as number,
      columnOrder: columnOrder as Array<'ASC' | 'DESC'>
    })

    return response.json(menuOptions)
  }
}

export { ListMenuOptionController }
