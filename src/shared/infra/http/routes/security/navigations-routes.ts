import { Router } from 'express'
import { CreateNavigationController } from '@modules/security/use-cases/navigation/create-navigation/create-navigation-controller'
import { ListNavigationController } from '@modules/security/use-cases/navigation/list-navigation/list-navigation-controller'
import { CountNavigationController } from '@modules/security/use-cases/navigation/count-navigation/count-navigation-controller'
import { SelectNavigationController } from '@modules/security/use-cases/navigation/select-navigation/select-navigation-controller'
import { GetNavigationController } from '@modules/security/use-cases/navigation/get-navigation/get-navigation-controller'
import { UpdateNavigationController } from '@modules/security/use-cases/navigation/update-navigation/update-navigation-controller'
import { DeleteNavigationController } from '@modules/security/use-cases/navigation/delete-navigation/delete-navigation-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const navigationsRoutes = Router()

const createNavigationController = new CreateNavigationController()
const listNavigationController = new ListNavigationController()
const countNavigationController = new CountNavigationController()
const selectNavigationController = new SelectNavigationController()
const getNavigationController = new GetNavigationController()
const updateNavigationController = new UpdateNavigationController()
const deleteNavigationController = new DeleteNavigationController()

navigationsRoutes.post('/', ensureAuthenticated, createNavigationController.handle)
navigationsRoutes.post('/list', ensureAuthenticated, listNavigationController.handle)
navigationsRoutes.post('/count', ensureAuthenticated, countNavigationController.handle)
navigationsRoutes.post('/select', ensureAuthenticated, selectNavigationController.handle)
navigationsRoutes.get('/:id', ensureAuthenticated, getNavigationController.handle)
navigationsRoutes.put('/', ensureAuthenticated, updateNavigationController.handle)
navigationsRoutes.delete('/:id', ensureAuthenticated, deleteNavigationController.handle)

export { navigationsRoutes }
