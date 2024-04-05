import { faker } from '@faker-js/faker'

export function generateNewUserData(overide = {}) {
  return {
    userGroupId: null,
    name: faker.datatype.string(),
    email: faker.datatype.string(),
    password: faker.datatype.string(),
    isAdmin: false,
    isSuperUser: false,
    isBlocked: false,
    blockReasonId: null,
    mustChangePasswordNextLogon: false,
    isDisabled: false,
    avatar: faker.datatype.string(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateUserData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    userGroupId: null,
    name: faker.datatype.string(),
    email: faker.datatype.string(),
    password: faker.datatype.string(),
    isAdmin: false,
    isSuperUser: false,
    isBlocked: false,
    blockReasonId: null,
    mustChangePasswordNextLogon: false,
    isDisabled: false,
    avatar: faker.datatype.string(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateUsersData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateUserData(overide)
    }
  )
}
