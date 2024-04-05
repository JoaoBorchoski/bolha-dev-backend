interface IEstadoDTO {
  id?: string
  codigoIbge?: string
  uf?: string
  nomeEstado?: string
  createdAt?: Date
  updatedAt?: Date
}

interface IEstadoSelectDTO {
  id?: string
  uf?: string
}

export { IEstadoDTO, IEstadoSelectDTO }
