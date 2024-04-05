import { inject, injectable } from 'tsyringe'
import { Navigation } from '@modules/security/infra/typeorm/entities/navigation'
import { INavigationRepository } from '@modules/security/repositories/i-navigation-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class SelectNavigationUseCase {
  constructor(@inject('NavigationRepository')
    private navigationRepository: INavigationRepository
  ) {}

  async execute(): Promise<HttpResponse> {
    const navigations = await this.navigationRepository.select()

    return navigations
  }
}

export { SelectNavigationUseCase }
