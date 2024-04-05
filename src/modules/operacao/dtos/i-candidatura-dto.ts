interface ICandidaturaDTO {
  id?: string
  nome?: string
  cep?: string
  paisId?: string
  estadoId?: string
  cidadeId?: string
  descricao?: string
  userId?: string
  createdAt?: Date
  updatedAt?: Date
}

interface ICandidaturaSelectDTO {
  ?: string
  ?: string
}

export { ICandidaturaDTO, ICandidaturaSelectDTO }
