interface ICepDTO {
  id?: string
  codigoCep?: string
  logradouro?: string
  bairro?: string
  estadoId?: string
  cidadeId?: string
  createdAt?: Date
  updatedAt?: Date
}

interface ICepSelectDTO {
  ?: string
  ?: string
}

export { ICepDTO, ICepSelectDTO }
