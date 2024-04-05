import { ICandidaturaDTO, ICandidaturaSelectDTO } from '@modules/operacao/dtos/i-candidatura-dto'
import { Candidatura } from '@modules/operacao/infra/typeorm/entities/candidatura'
import { HttpResponse } from '@shared/helpers'

interface ICandidaturaRepository {
  create(data: ICandidaturaDTO): Promise<Candidatura>


  list(
    userId: string,
    search: string,
    page: number,
    rowsPerPage: number,
    columnOrder: ('ASC' | 'DESC')[]
  ): Promise<Candidatura[]>


  select(userId: string): Promise<ICandidaturaSelectDTO[]>


  count(
    userId: string,
    search: string
  ): Promise<{ count: number }>


  get(id: string): Promise<Candidatura>


  update(data: ICandidaturaDTO): Promise<Candidatura>


  delete(id: string): Promise<void>
}

export { ICandidaturaRepository }
