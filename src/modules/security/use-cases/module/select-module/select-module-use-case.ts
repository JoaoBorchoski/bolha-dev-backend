import { inject, injectable } from 'tsyringe'
import { Module } from '@modules/security/infra/typeorm/entities/module'
import { IModuleRepository } from '@modules/security/repositories/i-module-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class SelectModuleUseCase {
  constructor(@inject('ModuleRepository')
    private moduleRepository: IModuleRepository
  ) {}

  async execute(): Promise<HttpResponse> {
    const modules = await this.moduleRepository.select()

    return modules
  }
}

export { SelectModuleUseCase }
