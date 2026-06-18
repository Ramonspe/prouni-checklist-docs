import type { Regra } from "./types.js";
import type { DocumentoId } from "../documents.js";

/**
 * Documentos ligados à situação de moradia do grupo familiar. Moradia cedida
 * não exige documento adicional além do comprovante de residência base.
 */
export const regraMoradia: Regra = (ficha) => {
  switch (ficha.moradia) {
    case "propria":
      return ["iptu"];
    case "alugada":
      return ["contrato_locacao"];
    case "financiada":
      return ["comprovante_financiamento"];
    case "cedida":
      return [];
    default:
      return [] satisfies DocumentoId[];
  }
};
