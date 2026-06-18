import type { Regra } from "./types.js";
import type { DocumentoId } from "../documents.js";

/**
 * Demais fontes de renda: benefícios do INSS, ausência de vínculo, pensão
 * alimentícia recebida e rendimentos de aluguel.
 */
export const regraRendaOutros: Regra = (ficha) => {
  const docs = new Set<DocumentoId>();
  for (const membro of ficha.grupoFamiliar) {
    if (membro.fontesRenda.includes("aposentado")) {
      docs.add("extrato_inss");
    }
    if (membro.fontesRenda.includes("desempregado")) {
      docs.add("ctps_baixa");
      docs.add("seguro_desemprego");
    }
    if (membro.fontesRenda.includes("pensao_alimenticia")) {
      docs.add("comprovante_pensao");
    }
    if (membro.fontesRenda.includes("aluguel")) {
      docs.add("recibo_aluguel_recebido");
    }
  }
  return [...docs];
};
