import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteProfileOptionUseCase } from './delete-profile-option-use-case'
import { ListProfileOptionUseCase } from '../list-profile-option/list-profile-option-use-case'
import { HttpResponse } from '@shared/helpers'

class DeleteProfileOptionController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteProfileOptionUseCase = container.resolve(DeleteProfileOptionUseCase)
    await deleteProfileOptionUseCase.execute(id)


    // restore list with updated records

    const listProfileOptionUseCase = container.resolve(ListProfileOptionUseCase)
    const profileOptions = await listProfileOptionUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      columnOrder: []
    })

    return response.json(profileOptions)
  }
}

export { DeleteProfileOptionController }
