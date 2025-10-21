/**
 * Product Type Definitions
 */

export interface Produto {
  id: number
  nome: string
  descricao: string
  preco: number
  estoque: number
  categoria: string
  imagemUrl: string | null
  ativo: boolean
  criadoEm: Date
  atualizadoEm: Date
}

export interface CreateProdutoRequest {
  nome: string
  descricao: string
  preco: number
  estoque: number
  categoria: string
  imagemUrl?: string
  ativo?: boolean
}

export interface UpdateProdutoRequest {
  nome?: string
  descricao?: string
  preco?: number
  estoque?: number
  categoria?: string
  imagemUrl?: string
  ativo?: boolean
}
