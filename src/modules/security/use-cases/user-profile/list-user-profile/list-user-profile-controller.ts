import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListUserProfileUseCase } from './list-user-profile-use-case'
import { HttpResponse } from '@shared/helpers'

class ListUserProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      rowsPerPage,
      columnOrder
    } = request.body

    const listUserProfileUseCase = container.resolve(ListUserProfileUseCase)

    const usersProfiles = await listUserProfileUseCase.execute({
      search: search as string,
      page: page as number,
      rowsPerPage: rowsPerPage as number,
      columnOrder: columnOrder as Array<'ASC' | 'DESC'>
    })

    return response.json(usersProfiles)
  }
}

export { ListUserProfileController }
