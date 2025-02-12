import { inject, injectable } from 'tsyringe'
import { Navigation } from '@modules/security/infra/typeorm/entities/navigation'
import { INavigationRepository } from '@modules/security/repositories/i-navigation-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class GetNavigationUseCase {
  constructor(@inject('NavigationRepository')
    private navigationRepository: INavigationRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const navigation = await this.navigationRepository.get(id)

    return navigation
  }
}

export { GetNavigationUseCase }
