import type { Regra } from "./types.js";

/**
 * Documentos exigidos de todo candidato, independentemente da situação:
 * identificação de cada membro e comprovante de residência da família.
 */
export const regraBase: Regra = () => ["rg_cpf", "comprovante_residencia"];
