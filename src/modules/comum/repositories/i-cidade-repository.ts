import { ICidadeDTO, ICidadeSelectDTO } from '@modules/comum/dtos/i-cidade-dto'
import { Cidade } from '@modules/comum/infra/typeorm/entities/cidade'
import { HttpResponse } from '@shared/helpers'

interface ICidadeRepository {
  create(data: ICidadeDTO): Promise<Cidade>


  list(
    search: string,
    page: number,
    rowsPerPage: number,
    columnOrder: ('ASC' | 'DESC')[]
  ): Promise<Cidade[]>


  select(): Promise<ICidadeSelectDTO[]>


  count(search: string): Promise<{ count: number }>


  get(id: string): Promise<Cidade>


  update(data: ICidadeDTO): Promise<Cidade>


  delete(id: string): Promise<void>
}

export { ICidadeRepository }
