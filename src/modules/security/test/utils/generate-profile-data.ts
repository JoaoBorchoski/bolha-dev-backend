import { faker } from '@faker-js/faker'

export function generateNewProfileData(overide = {}) {
  return {
    userGroupId: faker.datatype.uuid(),
    name: faker.datatype.string(),
    disabled: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateProfileData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    userGroupId: faker.datatype.uuid(),
    name: faker.datatype.string(),
    disabled: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateProfilesData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateProfileData(overide)
    }
  )
}
