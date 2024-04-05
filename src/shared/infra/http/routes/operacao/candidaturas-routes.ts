import { Router } from 'express'
import { CreateCandidaturaController } from '@modules/operacao/use-cases/candidatura/create-candidatura/create-candidatura-controller'
import { ListCandidaturaController } from '@modules/operacao/use-cases/candidatura/list-candidatura/list-candidatura-controller'
import { CountCandidaturaController } from '@modules/operacao/use-cases/candidatura/count-candidatura/count-candidatura-controller'
import { SelectCandidaturaController } from '@modules/operacao/use-cases/candidatura/select-candidatura/select-candidatura-controller'
import { GetCandidaturaController } from '@modules/operacao/use-cases/candidatura/get-candidatura/get-candidatura-controller'
import { UpdateCandidaturaController } from '@modules/operacao/use-cases/candidatura/update-candidatura/update-candidatura-controller'
import { DeleteCandidaturaController } from '@modules/operacao/use-cases/candidatura/delete-candidatura/delete-candidatura-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const candidaturasRoutes = Router()

const createCandidaturaController = new CreateCandidaturaController()
const listCandidaturaController = new ListCandidaturaController()
const countCandidaturaController = new CountCandidaturaController()
const selectCandidaturaController = new SelectCandidaturaController()
const getCandidaturaController = new GetCandidaturaController()
const updateCandidaturaController = new UpdateCandidaturaController()
const deleteCandidaturaController = new DeleteCandidaturaController()

candidaturasRoutes.post('/', ensureAuthenticated, createCandidaturaController.handle)
candidaturasRoutes.post('/list', ensureAuthenticated, listCandidaturaController.handle)
candidaturasRoutes.post('/count', ensureAuthenticated, countCandidaturaController.handle)
candidaturasRoutes.post('/select', ensureAuthenticated, selectCandidaturaController.handle)
candidaturasRoutes.get('/:id', ensureAuthenticated, getCandidaturaController.handle)
candidaturasRoutes.put('/', ensureAuthenticated, updateCandidaturaController.handle)
candidaturasRoutes.delete('/:id', ensureAuthenticated, deleteCandidaturaController.handle)

export { candidaturasRoutes }
