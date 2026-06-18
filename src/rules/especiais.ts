import type { Regra } from "./types.js";
import type { DocumentoId } from "../documents.js";

/**
 * Situações específicas que disparam documentos pontuais: deficiência de
 * algum membro, pais separados e posse de veículo.
 */
export const regraEspeciais: Regra = (ficha) => {
  const docs = new Set<DocumentoId>();

  if (ficha.grupoFamiliar.some((m) => m.pcd)) {
    docs.add("laudo_pcd");
  }
  if (ficha.paisSeparados) {
    docs.add("averbacao_separacao");
  }
  if (ficha.possuiVeiculo) {
    docs.add("crlv");
  }

  return [...docs];
};
