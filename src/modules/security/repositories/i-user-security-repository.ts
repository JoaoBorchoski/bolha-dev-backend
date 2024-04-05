import { IUserDTO } from '@modules/security/dtos/i-user-dto'
import { HttpResponse } from '@shared/helpers'

interface IUserSecurityRepository {
  // create
  create (data: IUserDTO): Promise<HttpResponse> 


  // list
  list (
    search: string,
    page: number,
    rowsPerPage: number,
    columnOrder: ('ASC' | 'DESC')[]
  ): Promise<HttpResponse>


  // select
  select (
    isAdmin: boolean,
    isSuperUser: boolean, 
    userGroupId: string
  ): Promise<HttpResponse>


  // count
  count (search: string): Promise<HttpResponse>


  // get
  get (id: string): Promise<HttpResponse>


  // update
  update (data: IUserDTO): Promise<HttpResponse>


  // delete
  delete (id: string): Promise<HttpResponse>

  
  // get user menu
  getUserMenu (id: string): Promise<HttpResponse>
}

export { IUserSecurityRepository }
