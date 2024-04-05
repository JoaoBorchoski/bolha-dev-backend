import { INavigationDTO } from '@modules/security/dtos/i-navigation-dto'
import { Navigation } from '@modules/security/infra/typeorm/entities/navigation'
import { HttpResponse } from '@shared/helpers'

interface INavigationRepository {
  // create
  create (data: INavigationDTO): Promise<HttpResponse> 


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
  update (data: INavigationDTO): Promise<HttpResponse>


  // delete
  delete (id: string): Promise<HttpResponse>
}

export { INavigationRepository }
