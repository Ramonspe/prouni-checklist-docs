import type { FichaSocioeconomica } from "../ficha.js";
import type { DocumentoId } from "../documents.js";

/**
 * Uma regra recebe a ficha e devolve os ids de documentos que ela exige.
 * Regras são puras: a mesma ficha sempre produz a mesma lista. A agregação
 * (remoção de duplicatas, ordenação) é responsabilidade de quem as combina.
 */
export type Regra = (ficha: FichaSocioeconomica) => DocumentoId[];
