import { inject, injectable } from 'tsyringe'
import { MenuOption } from '@modules/security/infra/typeorm/entities/menu-option'
import { IMenuOptionRepository } from '@modules/security/repositories/i-menu-option-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class SelectMenuOptionUseCase {
  constructor(@inject('MenuOptionRepository')
    private menuOptionRepository: IMenuOptionRepository
  ) {}

  async execute(): Promise<HttpResponse> {
    const menuOptions = await this.menuOptionRepository.select()

    return menuOptions
  }
}

export { SelectMenuOptionUseCase }
