import type { FichaSocioeconomica } from "./ficha.js";
import { DOCUMENTOS, type Documento, type DocumentoId } from "./documents.js";
import type { Regra } from "./rules/types.js";
import { regraBase } from "./rules/base.js";
import { regraRendaFormal } from "./rules/renda-clt.js";
import { regraRendaAutonoma } from "./rules/renda-autonomo.js";
import { regraRendaOutros } from "./rules/renda-outros.js";
import { regraMoradia } from "./rules/moradia.js";
import { regraEspeciais } from "./rules/especiais.js";

/** Todas as regras aplicadas, na ordem de avaliação. */
const REGRAS: Regra[] = [
  regraBase,
  regraRendaFormal,
  regraRendaAutonoma,
  regraRendaOutros,
  regraMoradia,
  regraEspeciais,
];

/**
 * Gera a checklist de documentos exigidos para uma ficha, sem duplicatas e
 * já resolvida em objetos `Documento`. A ordem segue a do catálogo, agrupável
 * por categoria na exibição.
 */
export function gerarChecklist(ficha: FichaSocioeconomica): Documento[] {
  const ids = new Set<DocumentoId>();
  for (const regra of REGRAS) {
    for (const id of regra(ficha)) ids.add(id);
  }

  // Preserva a ordem de declaração do catálogo para uma saída estável.
  return (Object.keys(DOCUMENTOS) as DocumentoId[])
    .filter((id) => ids.has(id))
    .map((id) => DOCUMENTOS[id]);
}
