import { faker } from '@faker-js/faker'

export function generateNewMenuOptionData(overide = {}) {
  return {
    moduleId: null,
    sequence: faker.datatype.string(),
    label: faker.datatype.string(),
    route: faker.datatype.string(),
    icon: faker.datatype.string(),
    disabled: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateMenuOptionData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    moduleId: null,
    sequence: faker.datatype.string(),
    label: faker.datatype.string(),
    route: faker.datatype.string(),
    icon: faker.datatype.string(),
    disabled: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateMenuOptionsData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateMenuOptionData(overide)
    }
  )
}
