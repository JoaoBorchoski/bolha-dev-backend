import { Router } from 'express'
import { CreatePaisController } from '@modules/comum/use-cases/pais/create-pais/create-pais-controller'
import { ListPaisController } from '@modules/comum/use-cases/pais/list-pais/list-pais-controller'
import { CountPaisController } from '@modules/comum/use-cases/pais/count-pais/count-pais-controller'
import { SelectPaisController } from '@modules/comum/use-cases/pais/select-pais/select-pais-controller'
import { GetPaisController } from '@modules/comum/use-cases/pais/get-pais/get-pais-controller'
import { UpdatePaisController } from '@modules/comum/use-cases/pais/update-pais/update-pais-controller'
import { DeletePaisController } from '@modules/comum/use-cases/pais/delete-pais/delete-pais-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const paisesRoutes = Router()

const createPaisController = new CreatePaisController()
const listPaisController = new ListPaisController()
const countPaisController = new CountPaisController()
const selectPaisController = new SelectPaisController()
const getPaisController = new GetPaisController()
const updatePaisController = new UpdatePaisController()
const deletePaisController = new DeletePaisController()

paisesRoutes.post('/', ensureAuthenticated, createPaisController.handle)
paisesRoutes.post('/list', ensureAuthenticated, listPaisController.handle)
paisesRoutes.post('/count', ensureAuthenticated, countPaisController.handle)
paisesRoutes.post('/select', ensureAuthenticated, selectPaisController.handle)
paisesRoutes.get('/:id', ensureAuthenticated, getPaisController.handle)
paisesRoutes.put('/', ensureAuthenticated, updatePaisController.handle)
paisesRoutes.delete('/:id', ensureAuthenticated, deletePaisController.handle)

export { paisesRoutes }
