import { IProfileOptionDTO } from '@modules/security/dtos/i-profile-option-dto'
import { ProfileOption } from '@modules/security/infra/typeorm/entities/profile-option'
import { HttpResponse } from '@shared/helpers'

interface IProfileOptionRepository {
  // create
  create (data: IProfileOptionDTO): Promise<HttpResponse> 


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
  update (data: IProfileOptionDTO): Promise<HttpResponse>


  // delete
  delete (id: string): Promise<HttpResponse>
}

export { IProfileOptionRepository }
