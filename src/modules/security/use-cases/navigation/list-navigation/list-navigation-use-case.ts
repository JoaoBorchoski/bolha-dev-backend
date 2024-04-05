import { inject, injectable } from 'tsyringe'
import { Navigation } from '@modules/security/infra/typeorm/entities/navigation'
import { INavigationRepository } from '@modules/security/repositories/i-navigation-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  columnOrder: Array<'ASC' | 'DESC'>
}

@injectable()
class ListNavigationUseCase {
  constructor(@inject('NavigationRepository')
    private navigationRepository: INavigationRepository
  ) {}

  async execute({
    search,
    page,
    rowsPerPage,
    columnOrder
  }: IRequest): Promise<HttpResponse> {
    const navigations = await this.navigationRepository.list(
      search,
      page,
      rowsPerPage,
      columnOrder
    )

    return navigations
  }
}

export { ListNavigationUseCase }
