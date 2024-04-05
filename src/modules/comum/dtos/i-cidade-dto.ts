interface ICidadeDTO {
  id?: string
  estadoId?: string
  codigoIbge?: string
  nomeCidade?: string
  createdAt?: Date
  updatedAt?: Date
}

interface ICidadeSelectDTO {
  id?: string
  nomeCidade?: string
}

export { ICidadeDTO, ICidadeSelectDTO }
