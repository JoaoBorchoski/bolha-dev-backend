import { IUserGroupDTO } from '@modules/security/dtos/i-user-group-dto'
import { HttpResponse } from '@shared/helpers'

interface IUserGroupRepository {
  // create
  create (data: IUserGroupDTO): Promise<HttpResponse> 


  // list
  list (
    search: string,
    page: number,
    rowsPerPage: number,
    columnOrder: ('ASC' | 'DESC')[]
  ): Promise<HttpResponse>


  // select
  select (): Promise<HttpResponse>


  // count
  count (search: string): Promise<HttpResponse>


  // get
  get (id: string): Promise<HttpResponse>


  // update
  update (data: IUserGroupDTO): Promise<HttpResponse>


  // delete
  delete (id: string): Promise<HttpResponse>
}

export { IUserGroupRepository }
