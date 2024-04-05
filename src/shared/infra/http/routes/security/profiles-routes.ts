import { Router } from 'express'
import { CreateProfileController } from '@modules/security/use-cases/profile/create-profile/create-profile-controller'
import { ListProfileController } from '@modules/security/use-cases/profile/list-profile/list-profile-controller'
import { CountProfileController } from '@modules/security/use-cases/profile/count-profile/count-profile-controller'
import { SelectProfileController } from '@modules/security/use-cases/profile/select-profile/select-profile-controller'
import { GetProfileController } from '@modules/security/use-cases/profile/get-profile/get-profile-controller'
import { UpdateProfileController } from '@modules/security/use-cases/profile/update-profile/update-profile-controller'
import { DeleteProfileController } from '@modules/security/use-cases/profile/delete-profile/delete-profile-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const profilesRoutes = Router()

const createProfileController = new CreateProfileController()
const listProfileController = new ListProfileController()
const countProfileController = new CountProfileController()
const selectProfileController = new SelectProfileController()
const getProfileController = new GetProfileController()
const updateProfileController = new UpdateProfileController()
const deleteProfileController = new DeleteProfileController()

profilesRoutes.post('/', ensureAuthenticated, createProfileController.handle)
profilesRoutes.post('/list', ensureAuthenticated, listProfileController.handle)
profilesRoutes.post('/count', ensureAuthenticated, countProfileController.handle)
profilesRoutes.post('/select', ensureAuthenticated, selectProfileController.handle)
profilesRoutes.get('/:id', ensureAuthenticated, getProfileController.handle)
profilesRoutes.put('/', ensureAuthenticated, updateProfileController.handle)
profilesRoutes.delete('/:id', ensureAuthenticated, deleteProfileController.handle)

export { profilesRoutes }
