import { getRepository, Repository } from 'typeorm'
import { IMenuOptionDTO } from '@modules/security/dtos/i-menu-option-dto'
import { IMenuOptionRepository } from '@modules/security/repositories/i-menu-option-repository'
import { MenuOption } from '@modules/security/infra/typeorm/entities/menu-option'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'

class MenuOptionRepository implements IMenuOptionRepository {
  private repository: Repository<MenuOption>

  constructor() {
    this.repository = getRepository(MenuOption)
  }


  // create
  async create ({
    moduleId,
    sequence,
    label,
    route,
    icon,
    key,
    disabled
  }: IMenuOptionDTO): Promise<HttpResponse> {
    const menuOption = this.repository.create({
      moduleId,
      sequence,
      label,
      route,
      icon,
      key,
      disabled
    })

    const result = await this.repository.save(menuOption)
      .then(menuOptionResult => {
        return ok(menuOptionResult)
      })
      .catch(error => {
        return serverError(error.message)
      })

    return result
  }


  // all
  async all (): Promise<HttpResponse> {
    try {
      let menuOptions = await this.repository.createQueryBuilder('men')
        .select([
          'men.id as "id"',
          'mod.id as "moduleId"',
          'mod.name as "moduleName"',
          'men.sequence as "sequence"',
          'men.label as "label"',
          'men.route as "route"',
          'men.key as "key"',
        ])
        .leftJoin('men.moduleId', 'mod')
        .addOrderBy('mod.name', 'ASC')
        .addOrderBy('men.sequence', 'ASC')
        .getRawMany()

      return ok(menuOptions)
    } catch (err) {
      return serverError(err)
    }
  }
  

  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    columnOrder: Array<'ASC' | 'DESC'>
  ): Promise<HttpResponse> {

    if ((typeof columnOrder === 'undefined') || (columnOrder.length === 0)) {
      const sortArray = new Array<'ASC' | 'DESC'>(4).fill('ASC')
      columnOrder = sortArray
    }

    const offset = rowsPerPage * page

    try {
      let menuOptions = await this.repository.createQueryBuilder('men')
        .select([
          'men.id as "id"',
          'mod.id as "moduleId"',
          'mod.name as "name"',
          'men.sequence as "sequence"',
          'men.label as "label"',
          'men.route as "route"',
        ])
        .leftJoin('men.moduleId', 'mod')
        .where('mod.name ilike :search', { search: `%${search}%` })
        .orWhere('men.sequence ilike :search', { search: `%${search}%` })
        .orWhere('men.label ilike :search', { search: `%${search}%` })
        .orWhere('men.route ilike :search', { search: `%${search}%` })
        .addOrderBy('mod.name', columnOrder[0])
        .addOrderBy('men.sequence', columnOrder[1])
        .addOrderBy('men.label', columnOrder[2])
        .addOrderBy('men.route', columnOrder[3])
        .take(rowsPerPage)
        .skip(offset)
        .getRawMany()

      // below statements are to solve typeorm bug related to use of leftjoins, filters, .take and .skip together

      if (menuOptions.length > rowsPerPage) {
        menuOptions = menuOptions.slice(offset, offset + rowsPerPage)
      }

      //

      return ok(menuOptions)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (): Promise<HttpResponse> {
    try {
      const menuOptions = await this.repository.createQueryBuilder('men')
        .select([
          'men.id',
          'men.label',
        ])
        .addOrderBy('men.label')
        .getMany()

      return ok(menuOptions)
    } catch (err) {
      return serverError(err)
    }
  }


  // count
  async count (search: string,): Promise<HttpResponse> {
    try {
      const menuOptions = await this.repository.createQueryBuilder('men')
        .select([
          'men.id as "id"',
        ])
        .leftJoin('men.moduleId', 'mod')
        .where('mod.name ilike :search', { search: `%${search}%` })
        .orWhere('men.sequence ilike :search', { search: `%${search}%` })
        .orWhere('men.label ilike :search', { search: `%${search}%` })
        .orWhere('men.route ilike :search', { search: `%${search}%` })
        .getRawMany()

      return ok({ count: menuOptions.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const menuOption = await this.repository.findOne(id)

      if (typeof menuOption === 'undefined') {
        return noContent()
      }

      return ok(menuOption)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    moduleId,
    sequence,
    label,
    route,
    icon,
    key,
    disabled
  }: IMenuOptionDTO): Promise<HttpResponse> {
    const menuOption = await this.repository.findOne(id)

    if (!menuOption) {
      return notFound()
    }

    const newmenuOption = this.repository.create({
      id,
      moduleId,
      sequence,
      label,
      route,
      icon,
      key,
      disabled
    })

    try {
      await this.repository.save(newmenuOption)

      return ok(newmenuOption)
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

export { MenuOptionRepository }
