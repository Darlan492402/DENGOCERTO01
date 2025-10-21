/**
 * Order Type Definitions
 */

export interface Pedido {
  id: number
  usuarioId: number
  status: "pendente" | "pago" | "enviado" | "entregue" | "cancelado"
  total: number
  enderecoEntrega: string
  criadoEm: Date
  atualizadoEm: Date
  usuario?: {
    id: number
    nome: string
    email: string
  }
  itens?: ItemPedido[]
}

export interface ItemPedido {
  id: number
  pedidoId: number
  produtoId: number
  quantidade: number
  precoUnit: number
  produto?: {
    id: number
    nome: string
    descricao: string
    imagemUrl: string | null
  }
}

export interface CreatePedidoRequest {
  itens: {
    produtoId: number
    quantidade: number
  }[]
  enderecoEntrega: string
}

export interface UpdatePedidoRequest {
  status: "pendente" | "pago" | "enviado" | "entregue" | "cancelado"
}
