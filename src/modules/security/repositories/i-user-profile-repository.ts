import { IUserProfileDTO } from '@modules/security/dtos/i-user-profile-dto'
import { UserProfile } from '@modules/security/infra/typeorm/entities/user-profile'
import { HttpResponse } from '@shared/helpers'

interface IUserProfileRepository {
  // create
  create (data: IUserProfileDTO): Promise<HttpResponse> 


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
  update (data: IUserProfileDTO): Promise<HttpResponse>


  // delete
  delete (id: string): Promise<HttpResponse>
}

export { IUserProfileRepository }
