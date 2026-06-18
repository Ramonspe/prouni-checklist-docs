/**
 * Catálogo central de documentos que podem ser exigidos no PROUNI.
 *
 * Cada regra referencia um documento por `id`. Manter o catálogo num único
 * lugar evita textos divergentes ("holerite" vs "contracheque") e facilita
 * auditar a orientação dada ao candidato.
 */

/** Categoria usada para agrupar os documentos na checklist final. */
export type CategoriaDocumento =
  | "pessoal"
  | "residencia"
  | "renda"
  | "moradia"
  | "especial";

/** Um documento solicitável, com orientação de preenchimento. */
export interface Documento {
  /** Identificador estável usado pelas regras. */
  id: string;
  /** Nome exibido ao candidato. */
  nome: string;
  /** Categoria para agrupamento na checklist. */
  categoria: CategoriaDocumento;
  /** Orientação curta sobre o que entregar. */
  orientacao: string;
}

/** Tabela de documentos indexada por id. */
export const DOCUMENTOS = {
  rg_cpf: {
    id: "rg_cpf",
    nome: "RG e CPF de cada membro do grupo familiar",
    categoria: "pessoal",
    orientacao:
      "Documento de identidade e CPF de todos os integrantes, inclusive menores.",
  },
  comprovante_residencia: {
    id: "comprovante_residencia",
    nome: "Comprovante de residência atualizado",
    categoria: "residencia",
    orientacao: "Conta de luz, água ou telefone dos últimos 3 meses.",
  },
  holerites: {
    id: "holerites",
    nome: "3 últimos holerites",
    categoria: "renda",
    orientacao: "Contracheques dos três meses mais recentes.",
  },
  ctps: {
    id: "ctps",
    nome: "Carteira de Trabalho (CTPS)",
    categoria: "renda",
    orientacao: "Páginas de identificação e do último contrato registrado.",
  },
  ctps_baixa: {
    id: "ctps_baixa",
    nome: "CTPS com baixa do último contrato",
    categoria: "renda",
    orientacao: "Comprova a ausência de vínculo empregatício atual.",
  },
  decore: {
    id: "decore",
    nome: "DECORE",
    categoria: "renda",
    orientacao: "Declaração de rendimentos emitida por contador (autônomos).",
  },
  declaracao_proprio_punho: {
    id: "declaracao_proprio_punho",
    nome: "Declaração de rendimentos de próprio punho",
    categoria: "renda",
    orientacao: "Para renda informal sem comprovação formal.",
  },
  pro_labore: {
    id: "pro_labore",
    nome: "Pró-labore",
    categoria: "renda",
    orientacao: "Comprovante de retirada mensal de sócio/titular.",
  },
  contrato_social: {
    id: "contrato_social",
    nome: "Contrato social da empresa",
    categoria: "renda",
    orientacao: "Para sócios ou titulares de empresa.",
  },
  extrato_inss: {
    id: "extrato_inss",
    nome: "Extrato de benefício do INSS",
    categoria: "renda",
    orientacao: "Detalhamento de crédito de aposentadoria ou pensão.",
  },
  seguro_desemprego: {
    id: "seguro_desemprego",
    nome: "Comprovante de seguro-desemprego",
    categoria: "renda",
    orientacao: "Caso esteja recebendo a parcela.",
  },
  comprovante_pensao: {
    id: "comprovante_pensao",
    nome: "Comprovante de pensão alimentícia",
    categoria: "renda",
    orientacao: "Decisão judicial ou declaração de quem paga.",
  },
  recibo_aluguel_recebido: {
    id: "recibo_aluguel_recebido",
    nome: "Recibos de aluguel recebido",
    categoria: "renda",
    orientacao: "Para quem possui imóvel alugado a terceiros.",
  },
  iptu: {
    id: "iptu",
    nome: "Carnê de IPTU",
    categoria: "moradia",
    orientacao: "Comprova a propriedade do imóvel de residência.",
  },
  contrato_locacao: {
    id: "contrato_locacao",
    nome: "Contrato de locação + recibo recente",
    categoria: "moradia",
    orientacao: "Para quem mora de aluguel.",
  },
  comprovante_financiamento: {
    id: "comprovante_financiamento",
    nome: "Comprovante de financiamento do imóvel",
    categoria: "moradia",
    orientacao: "Extrato ou contrato do financiamento habitacional.",
  },
  crlv: {
    id: "crlv",
    nome: "CRLV do veículo",
    categoria: "especial",
    orientacao: "Documento do veículo automotor da família.",
  },
  averbacao_separacao: {
    id: "averbacao_separacao",
    nome: "Averbação de separação/divórcio",
    categoria: "especial",
    orientacao: "Ou declaração quando não houver formalização.",
  },
  laudo_pcd: {
    id: "laudo_pcd",
    nome: "Laudo médico (PCD)",
    categoria: "especial",
    orientacao: "Laudo que comprove a deficiência do membro.",
  },
} satisfies Record<string, Documento>;

/** Todos os ids válidos do catálogo. */
export type DocumentoId = keyof typeof DOCUMENTOS;
