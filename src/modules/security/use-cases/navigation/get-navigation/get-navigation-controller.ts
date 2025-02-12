import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetNavigationUseCase } from './get-navigation-use-case'
import { HttpResponse } from '@shared/helpers'

class GetNavigationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getNavigationUseCase = container.resolve(GetNavigationUseCase)
    const navigation = await getNavigationUseCase.execute(id)

    return response.status(navigation.statusCode).json(navigation)
  }
}

export { GetNavigationController }
