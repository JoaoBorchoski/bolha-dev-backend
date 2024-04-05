import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteModuleUseCase } from './delete-module-use-case'
import { ListModuleUseCase } from '../list-module/list-module-use-case'
import { HttpResponse } from '@shared/helpers'

class DeleteModuleController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteModuleUseCase = container.resolve(DeleteModuleUseCase)
    await deleteModuleUseCase.execute(id)


    // restore list with updated records

    const listModuleUseCase = container.resolve(ListModuleUseCase)
    const modules = await listModuleUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      columnOrder: []
    })

    return response.json(modules)
  }
}

export { DeleteModuleController }
