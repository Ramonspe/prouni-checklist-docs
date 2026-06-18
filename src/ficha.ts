/**
 * Tipos que descrevem a ficha socioeconômica preenchida pelo candidato.
 *
 * A ficha é a entrada do motor de regras: a partir dela decidimos quais
 * documentos devem ser solicitados. Cada membro do grupo familiar pode ter
 * uma ou mais fontes de renda e situações específicas.
 */

/** Como cada membro do grupo familiar obtém renda (ou a ausência dela). */
export type FonteRenda =
  | "clt" // assalariado com carteira assinada
  | "servidor_publico" // servidor público
  | "autonomo" // autônomo / informal / profissional liberal
  | "empresario" // sócio ou titular de empresa
  | "aposentado" // aposentado ou pensionista do INSS
  | "desempregado" // sem renda formal no momento
  | "pensao_alimenticia" // recebe pensão alimentícia
  | "aluguel" // recebe rendimentos de aluguel
  | "estagio" // bolsa de estágio
  | "rural"; // produtor rural

/** Situação de moradia do grupo familiar. */
export type Moradia = "propria" | "alugada" | "financiada" | "cedida";

/** Um integrante do grupo familiar. */
export interface MembroGrupoFamiliar {
  /** Nome ou identificador do membro (apenas para exibição). */
  nome: string;
  /** Idade em anos — alguns documentos dependem de ser maior de idade. */
  idade: number;
  /** Fontes de renda do membro. Vazio = sem renda declarada. */
  fontesRenda: FonteRenda[];
  /** Indica se é pessoa com deficiência (exige laudo). */
  pcd?: boolean;
}

/** A ficha socioeconômica completa do candidato. */
export interface FichaSocioeconomica {
  /** Membros que compõem o grupo familiar (inclui o candidato). */
  grupoFamiliar: MembroGrupoFamiliar[];
  /** Situação de moradia da família. */
  moradia: Moradia;
  /** A família possui veículo automotor? */
  possuiVeiculo?: boolean;
  /** Os pais do candidato são separados/divorciados? */
  paisSeparados?: boolean;
}
