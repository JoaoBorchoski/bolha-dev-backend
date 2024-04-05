import { IModuleDTO } from '@modules/security/dtos/i-module-dto'
import { Module } from '@modules/security/infra/typeorm/entities/module'
import { HttpResponse } from '@shared/helpers'

interface IModuleRepository {
  // create
  create (data: IModuleDTO): Promise<HttpResponse> 


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
  update (data: IModuleDTO): Promise<HttpResponse>


  // delete
  delete (id: string): Promise<HttpResponse>
}

export { IModuleRepository }
