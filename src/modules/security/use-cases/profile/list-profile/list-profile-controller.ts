import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListProfileUseCase } from './list-profile-use-case'
import { HttpResponse } from '@shared/helpers'

class ListProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      rowsPerPage,
      columnOrder
    } = request.body

    const listProfileUseCase = container.resolve(ListProfileUseCase)

    const profiles = await listProfileUseCase.execute({
      search: search as string,
      page: page as number,
      rowsPerPage: rowsPerPage as number,
      columnOrder: columnOrder as Array<'ASC' | 'DESC'>
    })

    return response.json(profiles)
  }
}

export { ListProfileController }
