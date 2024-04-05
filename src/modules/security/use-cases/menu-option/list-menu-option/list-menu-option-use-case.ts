import { inject, injectable } from 'tsyringe'
import { MenuOption } from '@modules/security/infra/typeorm/entities/menu-option'
import { IMenuOptionRepository } from '@modules/security/repositories/i-menu-option-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  columnOrder: Array<'ASC' | 'DESC'>
}

@injectable()
class ListMenuOptionUseCase {
  constructor(@inject('MenuOptionRepository')
    private menuOptionRepository: IMenuOptionRepository
  ) {}

  async execute({
    search,
    page,
    rowsPerPage,
    columnOrder
  }: IRequest): Promise<HttpResponse> {
    const menuOptions = await this.menuOptionRepository.list(
      search,
      page,
      rowsPerPage,
      columnOrder
    )

    return menuOptions
  }
}

export { ListMenuOptionUseCase }
