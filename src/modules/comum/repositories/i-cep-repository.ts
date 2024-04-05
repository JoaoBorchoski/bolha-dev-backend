import { ICepDTO, ICepSelectDTO } from '@modules/comum/dtos/i-cep-dto'
import { Cep } from '@modules/comum/infra/typeorm/entities/cep'
import { HttpResponse } from '@shared/helpers'

interface ICepRepository {
  create(data: ICepDTO): Promise<Cep>


  list(
    search: string,
    page: number,
    rowsPerPage: number,
    columnOrder: ('ASC' | 'DESC')[]
  ): Promise<Cep[]>


  select(): Promise<ICepSelectDTO[]>


  count(search: string): Promise<{ count: number }>


  get(id: string): Promise<Cep>


  update(data: ICepDTO): Promise<Cep>


  delete(id: string): Promise<void>
}

export { ICepRepository }
