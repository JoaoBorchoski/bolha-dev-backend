import { IProfileOptionDTO } from '@modules/security/dtos/i-profile-option-dto'

interface IProfileDTO {
  id?: string
  userGroupId?: string
  name?: string
  menuOptions?: IProfileOptionDTO[]
  disabled?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export { IProfileDTO }
