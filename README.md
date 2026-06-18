# PROUNI Checklist de Documentos

Gera a **lista personalizada de documentos** que um candidato ao PROUNI precisa
entregar, a partir das respostas da ficha socioeconômica.

A ferramenta **não cria documentos** — ela responde à pergunta **"o que pedir?"**:
dada a composição e a situação do grupo familiar, devolve exatamente os
documentos exigidos (obrigatórios + condicionais), sem pedir papel que não se
aplica e sem esquecer o que é obrigatório.

## Por que existe

Na análise socioeconômica do PROUNI, a lista de documentos varia muito conforme
a situação de cada membro do grupo familiar. Codificar essas regras num único
lugar — testado e auditável — evita erros de "esqueci de pedir o DECORE" ou
"pedi IPTU de quem não tem imóvel".

## Instalação

```bash
npm install
npm run build
```

## Uso como biblioteca

```ts
import { gerarChecklist, conferirEntregas } from "prouni-checklist-docs";

const ficha = {
  grupoFamiliar: [
    { nome: "Maria", idade: 44, fontesRenda: ["clt"] },
    { nome: "Ana (candidata)", idade: 18, fontesRenda: [] },
  ],
  moradia: "alugada",
};

const docs = gerarChecklist(ficha);
// [{ id: "rg_cpf", ... }, { id: "holerites", ... }, { id: "contrato_locacao", ... }]

const conferencia = conferirEntregas(ficha, ["rg_cpf", "holerites"]);
// conferencia.faltando -> documentos ainda não entregues
```

## Uso pela CLI

```bash
npm run cli -- --ficha examples/familia-clt-aluguel.json
# ou em JSON, para integrar a outros sistemas:
npm run cli -- --ficha examples/familia-clt-aluguel.json --json
```

## Regras implementadas

| Situação na ficha            | Documentos exigidos                              |
| ---------------------------- | ------------------------------------------------ |
| _(sempre)_                   | RG + CPF de todos, comprovante de residência     |
| Assalariado CLT              | 3 últimos holerites, CTPS                        |
| Servidor público             | Contracheques                                    |
| Autônomo / informal          | DECORE, declaração de próprio punho              |
| Empresário / sócio           | Pró-labore, contrato social, DECORE              |
| Aposentado / pensionista     | Extrato de benefício do INSS                     |
| Desempregado                 | CTPS com baixa, seguro-desemprego                |
| Recebe pensão alimentícia    | Comprovante / decisão judicial                   |
| Recebe aluguel               | Recibos de aluguel                               |
| Mora de aluguel              | Contrato de locação + recibo                     |
| Imóvel próprio               | Carnê de IPTU                                     |
| Imóvel financiado            | Comprovante de financiamento                     |
| Possui veículo               | CRLV                                             |
| Pais separados               | Averbação / declaração                           |
| PCD no grupo familiar        | Laudo médico                                     |

## Desenvolvimento

```bash
npm test          # roda os testes (vitest)
npm run build     # compila para dist/
```

## Licença

[MIT](./LICENSE)
