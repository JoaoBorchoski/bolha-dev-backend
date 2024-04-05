import { getRepository, Repository } from 'typeorm'
import { IUserGroupDTO } from '@modules/security/dtos/i-user-group-dto'
import { IUserGroupRepository } from '@modules/security/repositories/i-user-group-repository'
import { UserGroup } from '@modules/security/infra/typeorm/entities/user-group'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'

class UserGroupRepository implements IUserGroupRepository {
  private repository: Repository<UserGroup>

  constructor() {
    this.repository = getRepository(UserGroup)
  }


  // create
  async create ({
    name,
    disabled
  }: IUserGroupDTO): Promise<HttpResponse> {
    const userGroup = this.repository.create({
      name,
      disabled
    })

    const result = await this.repository.save(userGroup)
      .then(userGroupResult => {
        return ok(userGroupResult)
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
      let userGroups = await this.repository.createQueryBuilder('use')
        .select([
          'use.id as "id"',
          'use.name as "name"',
        ])
        .where('use.name ilike :search', { search: `%${search}%` })
        .addOrderBy('use.name', columnOrder[0])
        .take(rowsPerPage)
        .skip(offset)
        .getRawMany()

      // below statements are to solve typeorm bug related to use of leftjoins, filters, .take and .skip together

      if (userGroups.length > rowsPerPage) {
        userGroups = userGroups.slice(offset, offset + rowsPerPage)
      }

      //

      return ok(userGroups)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (): Promise<HttpResponse> {
    try {
      const userGroups = await this.repository.createQueryBuilder('use')
        .select([
          'use.id',
          'use.name',
        ])
        .addOrderBy('use.name')
        .getMany()

      return ok(userGroups)
    } catch (err) {
      return serverError(err)
    }
  }


  // count
  async count (search: string,): Promise<HttpResponse> {
    try {
      const userGroups = await this.repository.createQueryBuilder('use')
        .select([
          'use.id as "id"',
        ])
        .where('use.name ilike :search', { search: `%${search}%` })
        .getRawMany()

      return ok({ count: userGroups.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const userGroup = await this.repository.findOne(id)

      if (typeof userGroup === 'undefined') {
        return noContent()
      }

      return ok(userGroup)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    name,
    disabled
  }: IUserGroupDTO): Promise<HttpResponse> {
    const userGroup = await this.repository.findOne(id)

    if (!userGroup) {
      return notFound()
    }

    const newuserGroup = this.repository.create({
      id,
      name,
      disabled
    })

    try {
      await this.repository.save(newuserGroup)

      return ok(newuserGroup)
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

export { UserGroupRepository }
