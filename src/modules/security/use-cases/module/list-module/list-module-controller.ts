import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListModuleUseCase } from './list-module-use-case'
import { HttpResponse } from '@shared/helpers'

class ListModuleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      rowsPerPage,
      columnOrder
    } = request.body

    const listModuleUseCase = container.resolve(ListModuleUseCase)

    const modules = await listModuleUseCase.execute({
      search: search as string,
      page: page as number,
      rowsPerPage: rowsPerPage as number,
      columnOrder: columnOrder as Array<'ASC' | 'DESC'>
    })

    return response.json(modules)
  }
}

export { ListModuleController }
