#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { gerarChecklist } from "./checklist.js";
import type { CategoriaDocumento } from "./documents.js";
import type { FichaSocioeconomica } from "./ficha.js";

const TITULOS: Record<CategoriaDocumento, string> = {
  pessoal: "DOCUMENTOS PESSOAIS",
  residencia: "RESIDÊNCIA",
  renda: "RENDA",
  moradia: "MORADIA",
  especial: "SITUAÇÕES ESPECÍFICAS",
};

function lerFicha(caminho: string): FichaSocioeconomica {
  return JSON.parse(readFileSync(caminho, "utf-8")) as FichaSocioeconomica;
}

function main(argv: string[]): void {
  const idx = argv.indexOf("--ficha");
  if (idx === -1 || !argv[idx + 1]) {
    console.error("uso: prouni-checklist --ficha <arquivo.json>");
    process.exit(1);
  }

  const ficha = lerFicha(argv[idx + 1]);
  const docs = gerarChecklist(ficha);
  const total = ficha.grupoFamiliar.length;

  // Saída legível por máquina, para integração com o portal.
  if (argv.includes("--json")) {
    console.log(JSON.stringify(docs, null, 2));
    return;
  }

  console.log(`\n✔ Checklist gerada para grupo familiar de ${total} pessoa(s)\n`);

  let categoriaAtual = "";
  for (const doc of docs) {
    if (doc.categoria !== categoriaAtual) {
      categoriaAtual = doc.categoria;
      console.log(TITULOS[doc.categoria]);
    }
    console.log(`  □ ${doc.nome}`);
    console.log(`      ${doc.orientacao}`);
  }
  console.log("");
}

main(process.argv.slice(2));
