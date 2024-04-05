import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectUserGroupUseCase } from './select-user-group-use-case'
import { HttpResponse } from '@shared/helpers'

class SelectUserGroupController {
  async handle(request: Request, response: Response): Promise<Response> {
    const selectUserGroupUseCase = container.resolve(SelectUserGroupUseCase)

    const userGroups = await selectUserGroupUseCase.execute()

    return response.json(userGroups)
  }
}

export { SelectUserGroupController }
