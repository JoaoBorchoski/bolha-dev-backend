import { Router } from 'express'
import { CreateUserProfileController } from '@modules/security/use-cases/user-profile/create-user-profile/create-user-profile-controller'
import { ListUserProfileController } from '@modules/security/use-cases/user-profile/list-user-profile/list-user-profile-controller'
import { CountUserProfileController } from '@modules/security/use-cases/user-profile/count-user-profile/count-user-profile-controller'
import { SelectUserProfileController } from '@modules/security/use-cases/user-profile/select-user-profile/select-user-profile-controller'
import { GetUserProfileController } from '@modules/security/use-cases/user-profile/get-user-profile/get-user-profile-controller'
import { UpdateUserProfileController } from '@modules/security/use-cases/user-profile/update-user-profile/update-user-profile-controller'
import { DeleteUserProfileController } from '@modules/security/use-cases/user-profile/delete-user-profile/delete-user-profile-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const usersProfilesRoutes = Router()

const createUserProfileController = new CreateUserProfileController()
const listUserProfileController = new ListUserProfileController()
const countUserProfileController = new CountUserProfileController()
const selectUserProfileController = new SelectUserProfileController()
const getUserProfileController = new GetUserProfileController()
const updateUserProfileController = new UpdateUserProfileController()
const deleteUserProfileController = new DeleteUserProfileController()

usersProfilesRoutes.post('/', ensureAuthenticated, createUserProfileController.handle)
usersProfilesRoutes.post('/list', ensureAuthenticated, listUserProfileController.handle)
usersProfilesRoutes.post('/count', ensureAuthenticated, countUserProfileController.handle)
usersProfilesRoutes.post('/select', ensureAuthenticated, selectUserProfileController.handle)
usersProfilesRoutes.get('/:id', ensureAuthenticated, getUserProfileController.handle)
usersProfilesRoutes.put('/', ensureAuthenticated, updateUserProfileController.handle)
usersProfilesRoutes.delete('/:id', ensureAuthenticated, deleteUserProfileController.handle)

export { usersProfilesRoutes }
