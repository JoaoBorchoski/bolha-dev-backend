import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListPaisUseCase } from './list-pais-use-case'
import { ok } from '@shared/helpers'

class ListPaisController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      search,
      page,
      rowsPerPage,
      columnOrder
    } = request.body


    const listPaisUseCase = container.resolve(ListPaisUseCase)

    const result = await listPaisUseCase.execute({
        search: search as string,
        page: page as number,
        rowsPerPage: rowsPerPage as number,
        columnOrder: columnOrder as Array<'ASC' | 'DESC'>
      })
      .then(paisesResult => {
        return ok(paisesResult)
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).send(result)
  }
}

export { ListPaisController }
