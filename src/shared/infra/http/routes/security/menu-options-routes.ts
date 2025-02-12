import { Router } from 'express'
import { CreateMenuOptionController } from '@modules/security/use-cases/menu-option/create-menu-option/create-menu-option-controller'
import { AllMenuOptionController } from '@modules/security/use-cases/menu-option/all-menu-option/all-menu-option-controller'
import { ListMenuOptionController } from '@modules/security/use-cases/menu-option/list-menu-option/list-menu-option-controller'
import { CountMenuOptionController } from '@modules/security/use-cases/menu-option/count-menu-option/count-menu-option-controller'
import { SelectMenuOptionController } from '@modules/security/use-cases/menu-option/select-menu-option/select-menu-option-controller'
import { GetMenuOptionController } from '@modules/security/use-cases/menu-option/get-menu-option/get-menu-option-controller'
import { UpdateMenuOptionController } from '@modules/security/use-cases/menu-option/update-menu-option/update-menu-option-controller'
import { DeleteMenuOptionController } from '@modules/security/use-cases/menu-option/delete-menu-option/delete-menu-option-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const menuOptionsRoutes = Router()

const createMenuOptionController = new CreateMenuOptionController()
const allMenuOptionController = new AllMenuOptionController()
const listMenuOptionController = new ListMenuOptionController()
const countMenuOptionController = new CountMenuOptionController()
const selectMenuOptionController = new SelectMenuOptionController()
const getMenuOptionController = new GetMenuOptionController()
const updateMenuOptionController = new UpdateMenuOptionController()
const deleteMenuOptionController = new DeleteMenuOptionController()

menuOptionsRoutes.post('/', ensureAuthenticated, createMenuOptionController.handle)
menuOptionsRoutes.post('/all', ensureAuthenticated, allMenuOptionController.handle)
menuOptionsRoutes.post('/list', ensureAuthenticated, listMenuOptionController.handle)
menuOptionsRoutes.post('/count', ensureAuthenticated, countMenuOptionController.handle)
menuOptionsRoutes.post('/select', ensureAuthenticated, selectMenuOptionController.handle)
menuOptionsRoutes.get('/:id', ensureAuthenticated, getMenuOptionController.handle)
menuOptionsRoutes.put('/', ensureAuthenticated, updateMenuOptionController.handle)
menuOptionsRoutes.delete('/:id', ensureAuthenticated, deleteMenuOptionController.handle)

export { menuOptionsRoutes }
