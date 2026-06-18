import type { FichaSocioeconomica } from "./ficha.js";
import { gerarChecklist } from "./checklist.js";
import type { Documento, DocumentoId } from "./documents.js";

/** Resultado da conferência entre o exigido e o que já foi entregue. */
export interface ResultadoConferencia {
  /** Documentos exigidos que ainda não foram entregues. */
  faltando: Documento[];
  /** Documentos exigidos que já foram entregues. */
  entregues: Documento[];
  /** Ids entregues que não constam da lista de exigidos. */
  extras: DocumentoId[];
  /** true quando não falta nenhum documento exigido. */
  completo: boolean;
}

/**
 * Compara a checklist exigida pela ficha com os documentos já entregues e
 * aponta o que falta. Não gera nem valida o conteúdo dos documentos — apenas
 * confere presença/ausência por id.
 */
export function conferirEntregas(
  ficha: FichaSocioeconomica,
  entregues: DocumentoId[],
): ResultadoConferencia {
  const exigidos = gerarChecklist(ficha);
  const entreguesSet = new Set(entregues);
  const exigidosSet = new Set(exigidos.map((d) => d.id));

  return {
    faltando: exigidos.filter((d) => !entreguesSet.has(d.id)),
    entregues: exigidos.filter((d) => entreguesSet.has(d.id)),
    extras: entregues.filter((id) => !exigidosSet.has(id)),
    completo: exigidos.every((d) => entreguesSet.has(d.id)),
  };
}
