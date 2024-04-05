import { getRepository, Repository } from 'typeorm'
import { IModuleDTO } from '@modules/security/dtos/i-module-dto'
import { IModuleRepository } from '@modules/security/repositories/i-module-repository'
import { Module } from '@modules/security/infra/typeorm/entities/module'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'

class ModuleRepository implements IModuleRepository {
  private repository: Repository<Module>

  constructor() {
    this.repository = getRepository(Module)
  }


  // create
  async create ({
    name,
    disabled
  }: IModuleDTO): Promise<HttpResponse> {
    const module = this.repository.create({
      name,
      disabled
    })

    const result = await this.repository.save(module)
      .then(moduleResult => {
        return ok(moduleResult)
      })
      .catch(error => {
        return serverError(error.message)
      })

    return result
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    columnOrder: Array<'ASC' | 'DESC'>
  ): Promise<HttpResponse> {

    if ((typeof columnOrder === 'undefined') || (columnOrder.length === 0)) {
      const sortArray = new Array<'ASC' | 'DESC'>(1).fill('ASC')
      columnOrder = sortArray
    }

    const offset = rowsPerPage * page

    try {
      let modules = await this.repository.createQueryBuilder('mod')
        .select([
          'mod.id as "id"',
          'mod.name as "name"',
        ])
        .where('mod.name ilike :search', { search: `%${search}%` })
        .addOrderBy('mod.name', columnOrder[0])
        .take(rowsPerPage)
        .skip(offset)
        .getRawMany()

      // below statements are to solve typeorm bug related to use of leftjoins, filters, .take and .skip together

      if (modules.length > rowsPerPage) {
        modules = modules.slice(offset, offset + rowsPerPage)
      }

      //

      return ok(modules)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (): Promise<HttpResponse> {
    try {
      const modules = await this.repository.createQueryBuilder('mod')
        .select([
          'mod.id',
          'mod.name',
        ])
        .addOrderBy('mod.name')
        .getMany()

      return ok(modules)
    } catch (err) {
      return serverError(err)
    }
  }


  // count
  async count (search: string,): Promise<HttpResponse> {
    try {
      const modules = await this.repository.createQueryBuilder('mod')
        .select([
          'mod.id as "id"',
        ])
        .where('mod.name ilike :search', { search: `%${search}%` })
        .getRawMany()

      return ok({ count: modules.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const module = await this.repository.findOne(id)

      if (typeof module === 'undefined') {
        return noContent()
      }

      return ok(module)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    name,
    disabled
  }: IModuleDTO): Promise<HttpResponse> {
    const module = await this.repository.findOne(id)

    if (!module) {
      return notFound()
    }

    const newmodule = this.repository.create({
      id,
      name,
      disabled
    })

    try {
      await this.repository.save(newmodule)

      return ok(newmodule)
    } catch (err) {
      return serverError(err)
    }
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    await this.repository.delete(id)

    return noContent()
  }
}

export { ModuleRepository }
