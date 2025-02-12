import { getRepository, Repository } from 'typeorm'
import { INavigationDTO } from '@modules/security/dtos/i-navigation-dto'
import { INavigationRepository } from '@modules/security/repositories/i-navigation-repository'
import { Navigation } from '@modules/security/infra/typeorm/entities/navigation'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'

class NavigationRepository implements INavigationRepository {
  private repository: Repository<Navigation>

  constructor() {
    this.repository = getRepository(Navigation)
  }


  // create
  async create ({
    userId,
    navigationDate,
    route
  }: INavigationDTO): Promise<HttpResponse> {
    const navigation = this.repository.create({
      userId,
      navigationDate,
      route
    })

    const result = await this.repository.save(navigation)
      .then(navigationResult => {
        return ok(navigationResult)
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
      const sortArray = new Array<'ASC' | 'DESC'>(3).fill('ASC')
      columnOrder = sortArray
    }

    const offset = rowsPerPage * page

    try {
      let navigations = await this.repository.createQueryBuilder('nav')
        .select([
          'nav.id as "id"',
          'use.id as "userId"',
          'use.name as "name"',
          'nav.navigationDate as "navigationDate"',
          'nav.route as "route"',
        ])
        .leftJoin('nav.userId', 'use')
        .where('use.name ilike :search', { search: `%${search}%` })
        .orWhere('nav.route ilike :search', { search: `%${search}%` })
        .addOrderBy('use.name', columnOrder[0])
        .addOrderBy('nav.navigationDate', columnOrder[1])
        .addOrderBy('nav.route', columnOrder[2])
        .take(rowsPerPage)
        .skip(offset)
        .getRawMany()

      // below statements are to solve typeorm bug related to use of leftjoins, filters, .take and .skip together

      if (navigations.length > rowsPerPage) {
        navigations = navigations.slice(offset, offset + rowsPerPage)
      }

      //

      return ok(navigations)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (): Promise<HttpResponse> {
    try {
      const navigations = await this.repository.createQueryBuilder('nav')
        .select([
          'nav.',
          'nav.',
        ])
        .addOrderBy('nav.')
        .getMany()

      return ok(navigations)
    } catch (err) {
      return serverError(err)
    }
  }


  // count
  async count (search: string,): Promise<HttpResponse> {
    try {
      const navigations = await this.repository.createQueryBuilder('nav')
        .select([
          'nav.id as "id"',
        ])
        .leftJoin('nav.userId', 'use')
        .where('nav.name ilike :search', { search: `%${search}%` })
        .orWhere('nav.route ilike :search', { search: `%${search}%` })
        .getRawMany()

      return ok({ count: navigations.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const navigation = await this.repository.findOne(id)

      if (typeof navigation === 'undefined') {
        return noContent()
      }

      return ok(navigation)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    userId,
    navigationDate,
    route
  }: INavigationDTO): Promise<HttpResponse> {
    const navigation = await this.repository.findOne(id)

    if (!navigation) {
      return notFound()
    }

    const newnavigation = this.repository.create({
      id,
      userId,
      navigationDate,
      route
    })

    try {
      await this.repository.save(newnavigation)

      return ok(newnavigation)
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

export { NavigationRepository }
