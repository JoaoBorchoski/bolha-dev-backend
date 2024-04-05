interface IVagaDTO {
  id?: string
  nomeVaga?: string
  paisId?: string
  estadoId?: string
  cidadeId?: string
  descricao?: string
  numeroCandidaturas?: number
  desabilitado?: boolean
  userId?: string
  createdAt?: Date
  updatedAt?: Date
}

interface IVagaSelectDTO {
  ?: string
  ?: string
}

export { IVagaDTO, IVagaSelectDTO }
