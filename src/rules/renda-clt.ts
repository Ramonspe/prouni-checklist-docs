import type { Regra } from "./types.js";
import type { DocumentoId } from "../documents.js";

/**
 * Renda de vínculo formal: empregados CLT e servidores públicos comprovam
 * renda pelos contracheques recentes. CLT acrescenta a carteira de trabalho.
 */
export const regraRendaFormal: Regra = (ficha) => {
  const docs = new Set<DocumentoId>();
  for (const membro of ficha.grupoFamiliar) {
    if (membro.fontesRenda.includes("clt")) {
      docs.add("holerites");
      docs.add("ctps");
    }
    if (membro.fontesRenda.includes("servidor_publico")) {
      docs.add("holerites");
    }
  }
  return [...docs];
};
