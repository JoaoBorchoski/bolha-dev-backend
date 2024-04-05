import { inject, injectable } from 'tsyringe'
import { User } from '@modules/security/infra/typeorm/entities/user'
import { IUserSecurityRepository } from '@modules/security/repositories/i-user-security-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  columnOrder: Array<'ASC' | 'DESC'>
}

@injectable()
class ListUserUseCase {
  constructor(@inject('UserSecurityRepository')
    private userSecurityRepository: IUserSecurityRepository
  ) {}

  async execute({
    search,
    page,
    rowsPerPage,
    columnOrder
  }: IRequest): Promise<HttpResponse> {
    const users = await this.userSecurityRepository.list(
      search,
      page,
      rowsPerPage,
      columnOrder
    )

    return users
  }
}

export { ListUserUseCase }
