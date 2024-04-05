import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListVagaUseCase } from './list-vaga-use-case'
import { ok } from '@shared/helpers'

class ListVagaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      search,
      page,
      rowsPerPage,
      columnOrder
    } = request.body

    const { id: userId } = request.user

    const listVagaUseCase = container.resolve(ListVagaUseCase)

    const result = await listVagaUseCase.execute({
        userId: userId as string,
        search: search as string,
        page: page as number,
        rowsPerPage: rowsPerPage as number,
        columnOrder: columnOrder as Array<'ASC' | 'DESC'>
      })
      .then(vagasResult => {
        return ok(vagasResult)
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).send(result)
  }
}

export { ListVagaController }
