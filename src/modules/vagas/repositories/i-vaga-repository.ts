import { IVagaDTO, IVagaSelectDTO } from '@modules/vagas/dtos/i-vaga-dto'
import { Vaga } from '@modules/vagas/infra/typeorm/entities/vaga'
import { HttpResponse } from '@shared/helpers'

interface IVagaRepository {
  create(data: IVagaDTO): Promise<Vaga>


  list(
    userId: string,
    search: string,
    page: number,
    rowsPerPage: number,
    columnOrder: ('ASC' | 'DESC')[]
  ): Promise<Vaga[]>


  select(userId: string): Promise<IVagaSelectDTO[]>


  count(
    userId: string,
    search: string
  ): Promise<{ count: number }>


  get(id: string): Promise<Vaga>


  update(data: IVagaDTO): Promise<Vaga>


  delete(id: string): Promise<void>
}

export { IVagaRepository }
