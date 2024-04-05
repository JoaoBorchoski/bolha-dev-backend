import { faker } from '@faker-js/faker'

export function generateNewCandidaturaData(overide = {}) {
  return {
    nome: faker.datatype.string(45),
    cep: faker.datatype.string(10),
    paisId: null,
    estadoId: null,
    cidadeId: null,
    descricao: faker.datatype.string(255),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateCandidaturaData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    nome: faker.datatype.string(45),
    cep: faker.datatype.string(10),
    paisId: null,
    estadoId: null,
    cidadeId: null,
    descricao: faker.datatype.string(255),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateCandidaturasData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateCandidaturaData(overide)
    }
  )
}
