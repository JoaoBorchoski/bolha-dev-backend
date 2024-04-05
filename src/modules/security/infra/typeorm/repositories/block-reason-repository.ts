import { getRepository, Repository } from 'typeorm'
import { IBlockReasonDTO } from '@modules/security/dtos/i-block-reason-dto'
import { IBlockReasonRepository } from '@modules/security/repositories/i-block-reason-repository'
import { BlockReason } from '@modules/security/infra/typeorm/entities/block-reason'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'

class BlockReasonRepository implements IBlockReasonRepository {
  private repository: Repository<BlockReason>

  constructor() {
    this.repository = getRepository(BlockReason)
  }


  // create
  async create ({
    code,
    description,
    instructionsToSolve,
    isSolvedByPasswordReset
  }: IBlockReasonDTO): Promise<HttpResponse> {
    const blockReason = this.repository.create({
      code,
      description,
      instructionsToSolve,
      isSolvedByPasswordReset
    })

    const result = await this.repository.save(blockReason)
      .then(blockReasonResult => {
        return ok(blockReasonResult)
      })
      .catch(error => {
        return serverError(error.message)
      })

    return result
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    columnOrder: Array<'ASC' | 'DESC'>
  ): Promise<HttpResponse> {

    if ((typeof columnOrder === 'undefined') || (columnOrder.length === 0)) {
      const sortArray = new Array<'ASC' | 'DESC'>(2).fill('ASC')
      columnOrder = sortArray
    }

    const offset = rowsPerPage * page

    try {
      let blockReasons = await this.repository.createQueryBuilder('blo')
        .select([
          'blo.id as "id"',
          'blo.code as "code"',
          'blo.description as "description"',
        ])
        .where('blo.code ilike :search', { search: `%${search}%` })
        .orWhere('blo.description ilike :search', { search: `%${search}%` })
        .addOrderBy('blo.code', columnOrder[0])
        .addOrderBy('blo.description', columnOrder[1])
        .take(rowsPerPage)
        .skip(offset)
        .getRawMany()

      // below statements are to solve typeorm bug related to use of leftjoins, filters, .take and .skip together

      if (blockReasons.length > rowsPerPage) {
        blockReasons = blockReasons.slice(offset, offset + rowsPerPage)
      }

      //

      return ok(blockReasons)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (): Promise<HttpResponse> {
    try {
      const blockReasons = await this.repository.createQueryBuilder('blo')
        .select([
          'blo.id',
          'blo.description',
        ])
        .addOrderBy('blo.description')
        .getMany()

      return ok(blockReasons)
    } catch (err) {
      return serverError(err)
    }
  }


  // count
  async count (search: string,): Promise<HttpResponse> {
    try {
      const blockReasons = await this.repository.createQueryBuilder('blo')
        .select([
          'blo.id as "id"',
        ])
        .where('blo.code ilike :search', { search: `%${search}%` })
        .orWhere('blo.description ilike :search', { search: `%${search}%` })
        .getRawMany()

      return ok({ count: blockReasons.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const blockReason = await this.repository.findOne(id)

      if (typeof blockReason === 'undefined') {
        return noContent()
      }

      return ok(blockReason)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    code,
    description,
    instructionsToSolve,
    isSolvedByPasswordReset
  }: IBlockReasonDTO): Promise<HttpResponse> {
    const blockReason = await this.repository.findOne(id)

    if (!blockReason) {
      return notFound()
    }

    const newblockReason = this.repository.create({
      id,
      code,
      description,
      instructionsToSolve,
      isSolvedByPasswordReset
    })

    try {
      await this.repository.save(newblockReason)

      return ok(newblockReason)
    } catch (err) {
      return serverError(err)
    }
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    await this.repository.delete(id)

    return noContent()
  }
}

export { BlockReasonRepository }
