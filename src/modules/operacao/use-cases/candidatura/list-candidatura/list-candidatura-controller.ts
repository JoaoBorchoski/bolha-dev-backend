import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListCandidaturaUseCase } from './list-candidatura-use-case'
import { ok } from '@shared/helpers'

class ListCandidaturaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      search,
      page,
      rowsPerPage,
      columnOrder
    } = request.body

    const { id: userId } = request.user

    const listCandidaturaUseCase = container.resolve(ListCandidaturaUseCase)

    const result = await listCandidaturaUseCase.execute({
        userId: userId as string,
        search: search as string,
        page: page as number,
        rowsPerPage: rowsPerPage as number,
        columnOrder: columnOrder as Array<'ASC' | 'DESC'>
      })
      .then(candidaturasResult => {
        return ok(candidaturasResult)
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).send(result)
  }
}

export { ListCandidaturaController }
