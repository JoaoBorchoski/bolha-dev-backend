interface IPaisDTO {
  id?: string
  codigoPais?: string
  nomePais?: string
  createdAt?: Date
  updatedAt?: Date
}

interface IPaisSelectDTO {
  id?: string
  nomePais?: string
}

export { IPaisDTO, IPaisSelectDTO }
