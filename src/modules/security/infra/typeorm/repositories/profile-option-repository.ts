import { getRepository, Repository } from 'typeorm'
import { IProfileOptionDTO } from '@modules/security/dtos/i-profile-option-dto'
import { IProfileOptionRepository } from '@modules/security/repositories/i-profile-option-repository'
import { ProfileOption } from '@modules/security/infra/typeorm/entities/profile-option'
import { MenuOption } from '@modules/security/infra/typeorm/entities/menu-option'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'

class ProfileOptionRepository implements IProfileOptionRepository {
  private repository: Repository<ProfileOption>

  constructor() {
    this.repository = getRepository(ProfileOption)
  }


  // create
  async create ({
    profileId,
    menuOptionKey,
    permitAll,
    permitCreate,
    permitRestore,
    permitUpdate,
    permitDelete,
    disabled
  }: IProfileOptionDTO): Promise<HttpResponse> {
    const profileOption = this.repository.create({
      profileId,
      menuOptionKey,
      permitAll,
      permitCreate,
      permitRestore,
      permitUpdate,
      permitDelete,
      disabled
    })

    const result = await this.repository.save(profileOption)
      .then(profileOptionResult => {
        return ok(profileOptionResult)
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
      let profileOptions = await this.repository.createQueryBuilder('pro')
        .select([
          'pro.id as "id"',
          'pr1.id as "profileId"',
          'pr1.name as "name"',
          'pro.menuOptionKey as "menuOptionKey"',
          'men.label as "label"'
        ])
        .leftJoin('pro.profileId', 'pr1')
        .leftJoin(MenuOption, 'men', 'pro.menu_option_key = men.key')
        .where('pr1.name ilike :search', { search: `%${search}%` })
        .addOrderBy('pr1.name', columnOrder[0])
        .addOrderBy('men.label', columnOrder[1])
        .take(rowsPerPage)
        .skip(offset)
        .getRawMany()

      // below statements are to solve typeorm bug related to use of leftjoins, filters, .take and .skip together

      if (profileOptions.length > rowsPerPage) {
        profileOptions = profileOptions.slice(offset, offset + rowsPerPage)
      }

      //

      return ok(profileOptions)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (): Promise<HttpResponse> {
    try {
      const profileOptions = await this.repository.createQueryBuilder('pro')
        .select([
          'pro.id',
          'pro.',
        ])
        .addOrderBy('pro.')
        .getMany()

      return ok(profileOptions)
    } catch (err) {
      return serverError(err)
    }
  }


  // count
  async count (search: string,): Promise<HttpResponse> {
    try {
      const profileOptions = await this.repository.createQueryBuilder('pro')
        .select([
          'pro.id as "id"',
        ])
        .leftJoin('pro.profileId', 'pr1')
        .where('pr1.name ilike :search', { search: `%${search}%` })
        .getRawMany()

      return ok({ count: profileOptions.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const profileOption = await this.repository.findOne(id)

      if (typeof profileOption === 'undefined') {
        return noContent()
      }

      return ok(profileOption)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    profileId,
    menuOptionKey,
    permitAll,
    permitCreate,
    permitRestore,
    permitUpdate,
    permitDelete,
    disabled
  }: IProfileOptionDTO): Promise<HttpResponse> {
    const profileOption = await this.repository.findOne(id)

    if (!profileOption) {
      return notFound()
    }

    const newprofileOption = this.repository.create({
      id,
      profileId,
      menuOptionKey,
      permitAll,
      permitCreate,
      permitRestore,
      permitUpdate,
      permitDelete,
      disabled
    })

    try {
      await this.repository.save(newprofileOption)

      return ok(newprofileOption)
    } catch (err) {
      return serverError(err)
    }
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    await this.repository.delete(id)

    return noContent()
  }


  // delete by profile
  async deleteByProfile (profileId: string): Promise<HttpResponse> {
    await this.repository.softDelete({ profileId: profileId })

    return noContent()
  }
}

export { ProfileOptionRepository }
