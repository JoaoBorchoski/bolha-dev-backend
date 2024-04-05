import { faker } from '@faker-js/faker'

export function generateNewVagaData(overide = {}) {
  return {
    nomeVaga: faker.datatype.string(100),
    paisId: null,
    estadoId: null,
    cidadeId: null,
    descricao: faker.datatype.string(255),
    desabilitado: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateVagaData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    nomeVaga: faker.datatype.string(100),
    paisId: null,
    estadoId: null,
    cidadeId: null,
    descricao: faker.datatype.string(255),
    desabilitado: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateVagasData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateVagaData(overide)
    }
  )
}
