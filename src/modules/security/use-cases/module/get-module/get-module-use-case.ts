import { inject, injectable } from 'tsyringe'
import { Module } from '@modules/security/infra/typeorm/entities/module'
import { IModuleRepository } from '@modules/security/repositories/i-module-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class GetModuleUseCase {
  constructor(@inject('ModuleRepository')
    private moduleRepository: IModuleRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const module = await this.moduleRepository.get(id)

    return module
  }
}

export { GetModuleUseCase }
