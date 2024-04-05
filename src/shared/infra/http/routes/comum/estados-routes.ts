import { Router } from 'express'
import { CreateEstadoController } from '@modules/comum/use-cases/estado/create-estado/create-estado-controller'
import { ListEstadoController } from '@modules/comum/use-cases/estado/list-estado/list-estado-controller'
import { CountEstadoController } from '@modules/comum/use-cases/estado/count-estado/count-estado-controller'
import { SelectEstadoController } from '@modules/comum/use-cases/estado/select-estado/select-estado-controller'
import { GetEstadoController } from '@modules/comum/use-cases/estado/get-estado/get-estado-controller'
import { UpdateEstadoController } from '@modules/comum/use-cases/estado/update-estado/update-estado-controller'
import { DeleteEstadoController } from '@modules/comum/use-cases/estado/delete-estado/delete-estado-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const estadosRoutes = Router()

const createEstadoController = new CreateEstadoController()
const listEstadoController = new ListEstadoController()
const countEstadoController = new CountEstadoController()
const selectEstadoController = new SelectEstadoController()
const getEstadoController = new GetEstadoController()
const updateEstadoController = new UpdateEstadoController()
const deleteEstadoController = new DeleteEstadoController()

estadosRoutes.post('/', ensureAuthenticated, createEstadoController.handle)
estadosRoutes.post('/list', ensureAuthenticated, listEstadoController.handle)
estadosRoutes.post('/count', ensureAuthenticated, countEstadoController.handle)
estadosRoutes.post('/select', ensureAuthenticated, selectEstadoController.handle)
estadosRoutes.get('/:id', ensureAuthenticated, getEstadoController.handle)
estadosRoutes.put('/', ensureAuthenticated, updateEstadoController.handle)
estadosRoutes.delete('/:id', ensureAuthenticated, deleteEstadoController.handle)

export { estadosRoutes }
