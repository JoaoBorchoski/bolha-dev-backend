import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListEstadoUseCase } from './list-estado-use-case'
import { ok } from '@shared/helpers'

class ListEstadoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      search,
      page,
      rowsPerPage,
      columnOrder
    } = request.body


    const listEstadoUseCase = container.resolve(ListEstadoUseCase)

    const result = await listEstadoUseCase.execute({
        search: search as string,
        page: page as number,
        rowsPerPage: rowsPerPage as number,
        columnOrder: columnOrder as Array<'ASC' | 'DESC'>
      })
      .then(estadosResult => {
        return ok(estadosResult)
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).send(result)
  }
}

export { ListEstadoController }
