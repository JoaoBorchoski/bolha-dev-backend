import { IEstadoDTO, IEstadoSelectDTO } from '@modules/comum/dtos/i-estado-dto'
import { Estado } from '@modules/comum/infra/typeorm/entities/estado'
import { HttpResponse } from '@shared/helpers'

interface IEstadoRepository {
  create(data: IEstadoDTO): Promise<Estado>


  list(
    search: string,
    page: number,
    rowsPerPage: number,
    columnOrder: ('ASC' | 'DESC')[]
  ): Promise<Estado[]>


  select(): Promise<IEstadoSelectDTO[]>


  count(search: string): Promise<{ count: number }>


  get(id: string): Promise<Estado>


  update(data: IEstadoDTO): Promise<Estado>


  delete(id: string): Promise<void>
}

export { IEstadoRepository }
