import type { Regra } from "./types.js";
import type { DocumentoId } from "../documents.js";

/**
 * Renda sem vínculo CLT: autônomos/informais comprovam por DECORE e
 * declaração de próprio punho; sócios/titulares acrescentam pró-labore e
 * contrato social; estagiários comprovam pelo holerite da bolsa.
 */
export const regraRendaAutonoma: Regra = (ficha) => {
  const docs = new Set<DocumentoId>();
  for (const membro of ficha.grupoFamiliar) {
    if (membro.fontesRenda.includes("autonomo")) {
      docs.add("decore");
      docs.add("declaracao_proprio_punho");
    }
    if (membro.fontesRenda.includes("empresario")) {
      docs.add("pro_labore");
      docs.add("contrato_social");
      docs.add("decore");
    }
    if (membro.fontesRenda.includes("rural")) {
      docs.add("declaracao_proprio_punho");
    }
    if (membro.fontesRenda.includes("estagio")) {
      docs.add("holerites");
    }
  }
  return [...docs];
};
