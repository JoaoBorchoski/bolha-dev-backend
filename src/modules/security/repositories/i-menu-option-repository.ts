import { IMenuOptionDTO } from '@modules/security/dtos/i-menu-option-dto'
import { MenuOption } from '@modules/security/infra/typeorm/entities/menu-option'
import { HttpResponse } from '@shared/helpers'

interface IMenuOptionRepository {
  // create
  create (data: IMenuOptionDTO): Promise<HttpResponse> 


  // all
  all (): Promise<HttpResponse>
  

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
  update (data: IMenuOptionDTO): Promise<HttpResponse>


  // delete
  delete (id: string): Promise<HttpResponse>
}

export { IMenuOptionRepository }
