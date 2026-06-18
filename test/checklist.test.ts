import { describe, it, expect } from "vitest";
import { gerarChecklist } from "../src/checklist.js";
import type { FichaSocioeconomica } from "../src/ficha.js";

function ids(ficha: FichaSocioeconomica): string[] {
  return gerarChecklist(ficha).map((d) => d.id);
}

describe("gerarChecklist", () => {
  it("sempre inclui os documentos obrigatórios", () => {
    const ficha: FichaSocioeconomica = {
      grupoFamiliar: [{ nome: "A", idade: 18, fontesRenda: [] }],
      moradia: "cedida",
    };
    expect(ids(ficha)).toEqual(["rg_cpf", "comprovante_residencia"]);
  });

  it("CLT exige holerites e CTPS; desempregado exige baixa e seguro", () => {
    const ficha: FichaSocioeconomica = {
      grupoFamiliar: [
        { nome: "Maria", idade: 44, fontesRenda: ["clt"] },
        { nome: "João", idade: 47, fontesRenda: ["desempregado"] },
      ],
      moradia: "alugada",
    };
    const r = ids(ficha);
    expect(r).toEqual(
      expect.arrayContaining([
        "holerites",
        "ctps",
        "ctps_baixa",
        "seguro_desemprego",
        "contrato_locacao",
      ]),
    );
  });

  it("não pede documento de moradia para imóvel cedido", () => {
    const ficha: FichaSocioeconomica = {
      grupoFamiliar: [{ nome: "A", idade: 20, fontesRenda: ["clt"] }],
      moradia: "cedida",
    };
    expect(ids(ficha)).not.toContain("iptu");
    expect(ids(ficha)).not.toContain("contrato_locacao");
  });

  it("dispara laudo, averbação e CRLV nas situações específicas", () => {
    const ficha: FichaSocioeconomica = {
      grupoFamiliar: [{ nome: "A", idade: 19, fontesRenda: [], pcd: true }],
      moradia: "propria",
      possuiVeiculo: true,
      paisSeparados: true,
    };
    const r = ids(ficha);
    expect(r).toEqual(
      expect.arrayContaining(["laudo_pcd", "averbacao_separacao", "crlv", "iptu"]),
    );
  });

  it("não duplica documentos quando dois membros têm a mesma fonte", () => {
    const ficha: FichaSocioeconomica = {
      grupoFamiliar: [
        { nome: "A", idade: 40, fontesRenda: ["clt"] },
        { nome: "B", idade: 42, fontesRenda: ["clt"] },
      ],
      moradia: "cedida",
    };
    const r = ids(ficha);
    expect(r.filter((id) => id === "holerites")).toHaveLength(1);
  });
});
