import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListNavigationUseCase } from './list-navigation-use-case'
import { HttpResponse } from '@shared/helpers'

class ListNavigationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      rowsPerPage,
      columnOrder
    } = request.body

    const listNavigationUseCase = container.resolve(ListNavigationUseCase)

    const navigations = await listNavigationUseCase.execute({
      search: search as string,
      page: page as number,
      rowsPerPage: rowsPerPage as number,
      columnOrder: columnOrder as Array<'ASC' | 'DESC'>
    })

    return response.json(navigations)
  }
}

export { ListNavigationController }
