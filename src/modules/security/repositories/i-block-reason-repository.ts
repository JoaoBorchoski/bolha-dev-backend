import { IBlockReasonDTO } from '@modules/security/dtos/i-block-reason-dto'
import { BlockReason } from '@modules/security/infra/typeorm/entities/block-reason'
import { HttpResponse } from '@shared/helpers'

interface IBlockReasonRepository {
  // create
  create (data: IBlockReasonDTO): Promise<HttpResponse> 


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
  update (data: IBlockReasonDTO): Promise<HttpResponse>


  // delete
  delete (id: string): Promise<HttpResponse>
}

export { IBlockReasonRepository }
