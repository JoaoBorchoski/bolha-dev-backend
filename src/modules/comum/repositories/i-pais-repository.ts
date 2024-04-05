import { IPaisDTO, IPaisSelectDTO } from '@modules/comum/dtos/i-pais-dto'
import { Pais } from '@modules/comum/infra/typeorm/entities/pais'
import { HttpResponse } from '@shared/helpers'

interface IPaisRepository {
  create(data: IPaisDTO): Promise<Pais>


  list(
    search: string,
    page: number,
    rowsPerPage: number,
    columnOrder: ('ASC' | 'DESC')[]
  ): Promise<Pais[]>


  select(): Promise<IPaisSelectDTO[]>


  count(search: string): Promise<{ count: number }>


  get(id: string): Promise<Pais>


  update(data: IPaisDTO): Promise<Pais>


  delete(id: string): Promise<void>
}

export { IPaisRepository }
