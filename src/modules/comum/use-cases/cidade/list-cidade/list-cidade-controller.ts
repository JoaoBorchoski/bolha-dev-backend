import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListCidadeUseCase } from './list-cidade-use-case'
import { ok } from '@shared/helpers'

class ListCidadeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      search,
      page,
      rowsPerPage,
      columnOrder
    } = request.body


    const listCidadeUseCase = container.resolve(ListCidadeUseCase)

    const result = await listCidadeUseCase.execute({
        search: search as string,
        page: page as number,
        rowsPerPage: rowsPerPage as number,
        columnOrder: columnOrder as Array<'ASC' | 'DESC'>
      })
      .then(cidadesResult => {
        return ok(cidadesResult)
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).send(result)
  }
}

export { ListCidadeController }
