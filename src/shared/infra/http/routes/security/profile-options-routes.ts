import { Router } from 'express'
import { CreateProfileOptionController } from '@modules/security/use-cases/profile-option/create-profile-option/create-profile-option-controller'
import { ListProfileOptionController } from '@modules/security/use-cases/profile-option/list-profile-option/list-profile-option-controller'
import { CountProfileOptionController } from '@modules/security/use-cases/profile-option/count-profile-option/count-profile-option-controller'
import { SelectProfileOptionController } from '@modules/security/use-cases/profile-option/select-profile-option/select-profile-option-controller'
import { GetProfileOptionController } from '@modules/security/use-cases/profile-option/get-profile-option/get-profile-option-controller'
import { UpdateProfileOptionController } from '@modules/security/use-cases/profile-option/update-profile-option/update-profile-option-controller'
import { DeleteProfileOptionController } from '@modules/security/use-cases/profile-option/delete-profile-option/delete-profile-option-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const profileOptionsRoutes = Router()

const createProfileOptionController = new CreateProfileOptionController()
const listProfileOptionController = new ListProfileOptionController()
const countProfileOptionController = new CountProfileOptionController()
const selectProfileOptionController = new SelectProfileOptionController()
const getProfileOptionController = new GetProfileOptionController()
const updateProfileOptionController = new UpdateProfileOptionController()
const deleteProfileOptionController = new DeleteProfileOptionController()

profileOptionsRoutes.post('/', ensureAuthenticated, createProfileOptionController.handle)
profileOptionsRoutes.post('/list', ensureAuthenticated, listProfileOptionController.handle)
profileOptionsRoutes.post('/count', ensureAuthenticated, countProfileOptionController.handle)
profileOptionsRoutes.post('/select', ensureAuthenticated, selectProfileOptionController.handle)
profileOptionsRoutes.get('/:id', ensureAuthenticated, getProfileOptionController.handle)
profileOptionsRoutes.put('/', ensureAuthenticated, updateProfileOptionController.handle)
profileOptionsRoutes.delete('/:id', ensureAuthenticated, deleteProfileOptionController.handle)

export { profileOptionsRoutes }
