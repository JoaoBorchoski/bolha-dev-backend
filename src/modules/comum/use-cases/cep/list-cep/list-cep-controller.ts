import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListCepUseCase } from './list-cep-use-case'
import { ok } from '@shared/helpers'

class ListCepController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      search,
      page,
      rowsPerPage,
      columnOrder
    } = request.body


    const listCepUseCase = container.resolve(ListCepUseCase)

    const result = await listCepUseCase.execute({
        search: search as string,
        page: page as number,
        rowsPerPage: rowsPerPage as number,
        columnOrder: columnOrder as Array<'ASC' | 'DESC'>
      })
      .then(cepsResult => {
        return ok(cepsResult)
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).send(result)
  }
}

export { ListCepController }
