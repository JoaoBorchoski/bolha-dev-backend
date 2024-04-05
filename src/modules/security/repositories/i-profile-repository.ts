import { IProfileDTO } from '@modules/security/dtos/i-profile-dto'
import { Profile } from '@modules/security/infra/typeorm/entities/profile'
import { HttpResponse } from '@shared/helpers'

interface IProfileRepository {
  // create
  create (data: IProfileDTO): Promise<HttpResponse> 


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
  update (data: IProfileDTO): Promise<HttpResponse>


  // delete
  delete (id: string): Promise<HttpResponse>
}

export { IProfileRepository }
