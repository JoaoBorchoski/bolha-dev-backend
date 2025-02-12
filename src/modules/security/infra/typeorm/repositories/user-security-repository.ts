import { getRepository, Repository, getManager } from 'typeorm'
import { IUserDTO } from '@modules/security/dtos/i-user-dto'
import { IUserSecurityRepository } from '@modules/security/repositories/i-user-security-repository'
import { User } from '@modules/security/infra/typeorm/entities/user'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'

interface SubMenuOption {
  id: string
  icon: string
  text: string
  route: string
}

interface IUserMenuDTO {
  moduleName: string
  sequence: string
  icon: string
  label: string
  route: string
  key: string
  permitAll: boolean
  permitCreate: boolean
  permitRestore: boolean
  permitUpdate: boolean
  permitDelete: boolean
  disabled: boolean
}
const convertMenuStructure = (userMenu: IUserMenuDTO[]) => {
  let subMenu = new Array<SubMenuOption>()
  let currentLevel = userMenu[0].sequence.substring(0, 3)
  let currentIcon = userMenu[0].icon
  let currentText = userMenu[0].label

  const menuStructure = userMenu.reduce((newArray, option) => {
    if (currentLevel !== option.sequence.substring(0, 3)) {
      const result = {
        id: currentLevel,
        icon: currentIcon.toLowerCase(),
        text: currentText,
        route: '',
        subMenuOptions: subMenu
      }

      subMenu = new Array<SubMenuOption>()
      currentLevel = option.sequence.substring(0, 3)
      currentIcon = option.icon.toLowerCase()
      currentText = option.label.length > 26 ? option.label.substr(0, 26) + '...' : option.label

      newArray.push(result)
    } else {
      if (option.route !== '') {
        const result = {
          id: option.sequence,
          icon: option.icon.toLowerCase(),
          text: option.label.length > 26 ? option.label.substr(0, 26) + '...' : option.label,
          route: option.route,
          permitAll: option.permitAll,
          permitCreate: option.permitCreate,
          permitRestore: option.permitRestore,
          permitUpdate: option.permitUpdate,
          permitDelete: option.permitDelete
        }

        subMenu.push(result)
      }
    }

    return newArray
  }, [])

  const result = {
    id: currentLevel,
    icon: currentIcon.toLowerCase(),
    text: currentText,
    route: '',
    subMenuOptions: subMenu
  }

  menuStructure.push(result)

  return menuStructure
}


class UserSecurityRepository implements IUserSecurityRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }


  // create
  async create ({
    userGroupId,
    name,
    email,
    password,
    isAdmin,
    isSuperUser,
    isBlocked,
    blockReasonId,
    mustChangePasswordNextLogon,
    isDisabled,
    avatar
  }: IUserDTO): Promise<HttpResponse> {
    const user = this.repository.create({
      userGroupId,
      name,
      email,
      password,
      isAdmin,
      isSuperUser,
      isBlocked,
      blockReasonId,
      mustChangePasswordNextLogon,
      isDisabled,
      avatar
    })

    const result = await this.repository.save(user)
      .then(userResult => {
        return ok(userResult)
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
      const sortArray = new Array<'ASC' | 'DESC'>(4).fill('ASC')
      columnOrder = sortArray
    }

    const offset = rowsPerPage * page

    try {
      let users = await this.repository.createQueryBuilder('use')
        .select([
          'use.id as "id"',
          'us1.id as "userGroupId"',
          'us1.name as "userGroupName"',
          'use.name as "name"',
          'use.email as "email"',
          'blo.id as "blockReasonId"',
          'blo.description as "description"',
        ])
        .leftJoin('use.userGroupId', 'us1')
        .leftJoin('use.blockReasonId', 'blo')
        .where('us1.name ilike :search', { search: `%${search}%` })
        .orWhere('use.name ilike :search', { search: `%${search}%` })
        .orWhere('use.email ilike :search', { search: `%${search}%` })
        .addOrderBy('us1.name', columnOrder[0])
        .addOrderBy('use.name', columnOrder[1])
        .addOrderBy('use.email', columnOrder[2])
        .addOrderBy('blo.description', columnOrder[3])
        .take(rowsPerPage)
        .skip(offset)
        .getRawMany()

      // below statements are to solve typeorm bug related to use of leftjoins, filters, .take and .skip together

      if (users.length > rowsPerPage) {
        users = users.slice(offset, offset + rowsPerPage)
      }

      //

      return ok(users)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (
      isAdmin: boolean,
      isSuperUser: boolean,
      userGroupId: string
    ): Promise<HttpResponse> {
    try {
      let users = []

      if (!isSuperUser) {
        users = await this.repository.createQueryBuilder('use')
          .select([
            'use.id as "id"',
            'use.name as "name"',
          ])
          .where('use.userGroupId = :userGroupId', { userGroupId: `${userGroupId}` })
          .addOrderBy('use.name')
          .getRawMany()
      } else {
        users = await this.repository.createQueryBuilder('use')
          .select([
            'use.id as "id"',
            'CONCAT(us1.name, \' - \', use.name) as "name"',
          ])
          .leftJoin('use.userGroupId', 'us1')
          .addOrderBy(`CONCAT(us1.name, \' - \', use.name)`)
          .getRawMany()
      }

      return ok(users)
    } catch (err) {
      return serverError(err)
    }
  }


  // count
  async count (search: string,): Promise<HttpResponse> {
    try {
      const users = await this.repository.createQueryBuilder('use')
        .select([
          'use.id as "id"',
        ])
        .leftJoin('use.userGroupId', 'us1')
        .leftJoin('use.blockReasonId', 'blo')
        .where('us1.name ilike :search', { search: `%${search}%` })
        .orWhere('use.name ilike :search', { search: `%${search}%` })
        .orWhere('use.email ilike :search', { search: `%${search}%` })
        .getRawMany()

      return ok({ count: users.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const user = await this.repository.findOne(id)

      if (typeof user === 'undefined') {
        return noContent()
      }

      return ok(user)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    userGroupId,
    name,
    email,
    password,
    isAdmin,
    isSuperUser,
    isBlocked,
    blockReasonId,
    mustChangePasswordNextLogon,
    isDisabled,
    avatar
  }: IUserDTO): Promise<HttpResponse> {
    const user = await this.repository.findOne(id)

    if (!user) {
      return notFound()
    }

    const newuser = this.repository.create({
      id,
      userGroupId,
      name,
      email,
      password,
      isAdmin,
      isSuperUser,
      isBlocked,
      blockReasonId,
      mustChangePasswordNextLogon,
      isDisabled,
      avatar
    })

    try {
      await this.repository.save(newuser)

      return ok(newuser)
    } catch (err) {
      return serverError(err)
    }
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    await this.repository.delete(id)

    return noContent()
  }


  // get user menu
  async getUserMenu (id: string): Promise<HttpResponse> {
    try {
      const manager = getManager();

      let userMenu = await manager.query(`
        select distinct
          mod.name as "moduleName",
          men.sequence as "sequence",
          men.icon as "icon",
          men.label as "label",
          men.route as "route",
          men.key as "key",
          pro.permit_all as "permitAll",
          pro.permit_create as "permitCreate",
          pro.permit_restore as "permitRestore",
          pro.permit_update as "permitUpdate",
          pro.permit_delete as "permitDelete",
          pro.disabled as "disabled"

        from menu_options as men
        ,    modules as mod
        ,    profile_options as pro
        where men.module_id = mod.id
        and   men.key = pro.menu_option_key
        and   not (
                    permit_all is null and
                    permit_create is null and
                    permit_restore is null and
                    permit_update is null and
                    permit_delete is null
                  )
        and   pro.profile_id in (
                                  select profile_id
                                  from users_profiles
                                  where user_id = '${id}'
                                )
        order by men.sequence
        ,      mod.name
      `)

      if (!userMenu.length) {
        return ok(userMenu)
      }

      let convertedMenus = convertMenuStructure(userMenu)

      convertedMenus.map(convertedMenu => {
        convertedMenu.subMenuOptions = convertedMenu.subMenuOptions.filter(subMenu => subMenu.permitAll === true || 
          subMenu.permitRestore === true ||
          subMenu.permitUpdate === true ||
          subMenu.permitDelete === true
        )
      })

      convertedMenus = convertedMenus.filter(convertedMenu => convertedMenu.subMenuOptions.length !== 0)

      return ok(convertedMenus)
    } catch (err) {
      return serverError(err)
    }
  }
}

export { UserSecurityRepository }
