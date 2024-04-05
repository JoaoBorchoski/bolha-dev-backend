import { Router } from 'express'
import { CreateVagaController } from '@modules/vagas/use-cases/vaga/create-vaga/create-vaga-controller'
import { ListVagaController } from '@modules/vagas/use-cases/vaga/list-vaga/list-vaga-controller'
import { CountVagaController } from '@modules/vagas/use-cases/vaga/count-vaga/count-vaga-controller'
import { SelectVagaController } from '@modules/vagas/use-cases/vaga/select-vaga/select-vaga-controller'
import { GetVagaController } from '@modules/vagas/use-cases/vaga/get-vaga/get-vaga-controller'
import { UpdateVagaController } from '@modules/vagas/use-cases/vaga/update-vaga/update-vaga-controller'
import { DeleteVagaController } from '@modules/vagas/use-cases/vaga/delete-vaga/delete-vaga-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const vagasRoutes = Router()

const createVagaController = new CreateVagaController()
const listVagaController = new ListVagaController()
const countVagaController = new CountVagaController()
const selectVagaController = new SelectVagaController()
const getVagaController = new GetVagaController()
const updateVagaController = new UpdateVagaController()
const deleteVagaController = new DeleteVagaController()

vagasRoutes.post('/', ensureAuthenticated, createVagaController.handle)
vagasRoutes.post('/list', ensureAuthenticated, listVagaController.handle)
vagasRoutes.post('/count', ensureAuthenticated, countVagaController.handle)
vagasRoutes.post('/select', ensureAuthenticated, selectVagaController.handle)
vagasRoutes.get('/:id', ensureAuthenticated, getVagaController.handle)
vagasRoutes.put('/', ensureAuthenticated, updateVagaController.handle)
vagasRoutes.delete('/:id', ensureAuthenticated, deleteVagaController.handle)

export { vagasRoutes }
