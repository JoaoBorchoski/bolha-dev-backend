import { getRepository, Repository } from 'typeorm'
import { IUserProfileDTO } from '@modules/security/dtos/i-user-profile-dto'
import { IUserProfileRepository } from '@modules/security/repositories/i-user-profile-repository'
import { UserProfile } from '@modules/security/infra/typeorm/entities/user-profile'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'

class UserProfileRepository implements IUserProfileRepository {
  private repository: Repository<UserProfile>

  constructor() {
    this.repository = getRepository(UserProfile)
  }


  // create
  async create ({
    userId,
    profileId
  }: IUserProfileDTO): Promise<HttpResponse> {
    const userProfile = this.repository.create({
      userId,
      profileId
    })

    const result = await this.repository.save(userProfile)
      .then(userProfileResult => {
        return ok(userProfileResult)
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
      const sortArray = new Array<'ASC' | 'DESC'>(2).fill('ASC')
      columnOrder = sortArray
    }

    const offset = rowsPerPage * page

    try {
      let usersProfiles = await this.repository.createQueryBuilder('use')
        .select([
          'use.id as "id"',
          'us1.id as "userId"',
          'us1.name as "userName"',
          'pro.id as "profileId"',
          'pro.name as "profileName"',
        ])
        .leftJoin('use.userId', 'us1')
        .leftJoin('use.profileId', 'pro')
        .where('us1.name ilike :search', { search: `%${search}%` })
        .addOrderBy('us1.name', columnOrder[0])
        .addOrderBy('pro.name', columnOrder[1])
        .take(rowsPerPage)
        .skip(offset)
        .getRawMany()

      // below statements are to solve typeorm bug related to use of leftjoins, filters, .take and .skip together

      if (usersProfiles.length > rowsPerPage) {
        usersProfiles = usersProfiles.slice(offset, offset + rowsPerPage)
      }

      //

      return ok(usersProfiles)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (): Promise<HttpResponse> {
    try {
      const usersProfiles = await this.repository.createQueryBuilder('use')
        .select([
          'use.',
          'use.',
        ])
        .addOrderBy('use.')
        .getMany()

      return ok(usersProfiles)
    } catch (err) {
      return serverError(err)
    }
  }


  // count
  async count (search: string,): Promise<HttpResponse> {
    try {
      const usersProfiles = await this.repository.createQueryBuilder('use')
        .select([
          'use.id as "id"',
        ])
        .leftJoin('use.userId', 'us1')
        .leftJoin('use.profileId', 'pro')
        .where('us1.name ilike :search', { search: `%${search}%` })
        .getRawMany()

      return ok({ count: usersProfiles.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const userProfile = await this.repository.findOne(id)

      if (typeof userProfile === 'undefined') {
        return noContent()
      }

      return ok(userProfile)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    userId,
    profileId
  }: IUserProfileDTO): Promise<HttpResponse> {
    const userProfile = await this.repository.findOne(id)

    if (!userProfile) {
      return notFound()
    }

    const newuserProfile = this.repository.create({
      id,
      userId,
      profileId
    })

    try {
      await this.repository.save(newuserProfile)

      return ok(newuserProfile)
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

export { UserProfileRepository }
