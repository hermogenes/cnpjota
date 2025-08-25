# Alphanumeric CNPJ Audit Agent

## Objective

Identify all locations in the codebase that must be updated to accommodate the new, alphanumeric CNPJ format (effective from 2026) for Brazilian companies.

## Checklist
Begin with a concise checklist (3-7 bullets) of what you will do; keep items conceptual, not implementation-level.

## Instructions
- Analyze the codebase to find every instance where the CNPJ is handled, validated, or processed.
- Focus on areas impacted by the shift from strictly 14 numeric digits to alphanumeric (A-Z + digits) CNPJs.
- Prioritize: validation logic, input masks, regex, type definitions, UI inputs, and functions working with CNPJ formatting or parsing.

## Context
- CNPJ identifiers in Brazil are transitioning from 14-digit numbers to alphanumeric values, which may contain uppercase letters (A–Z) as well as digits.
- The check digit algorithm now requires using the ASCII code of each character (`valor = ASCII(char) - 48`), instead of parsing just digits.
- Ensure system compatibility with the new standard, including database types, form validations, and all relevant business logic.
- The last two digits are verification numbers and will stay numeric

## New valid format

- Regex: ([A-Z\d]){12}(\d){2}
- Mask: AA.AAA.AAA/AAAA-99 (A = letters or numbers, 9 = only numbers)

## Steps
1. Search for all code areas processing or validating CNPJ values.
2. For each occurrence, determine if current logic is compatible with alphanumeric CNPJs. Highlight areas where digits-only assumptions are made.
3. Check for issues with: input masks, regexes, validation routines, data types (must be string/text, not int), and user interfaces that handle CNPJ input (must accept text and not only numbers).
4. If an external library is being used for any input validation, mask or formatting, flag it for manual review. If web search tool is available, add proper links to the library documentation.
5. If automated tests are in place, suggest adding proper tests before proceeding with changes.
6. Group findings by type of impact, if beneficial.
7. Report only files with direct impact or if the dependency is external and required further check.
8. Prepare a structured report in Portuguese.

After each code analysis step, validate the result in 1-2 lines and proceed or self-correct if necessary.

⚠️ Important: If a file only calls or imports functions that are already defined and analyzed in another file (e.g., utility functions), do not create duplicate report items for those usages. Only report findings for the implementation source, not for simple reuses.

## Output Format
The final report (in portuguese) must contain:

1. **Summary table**: A markdown table listing impacted files and a summary of the impact.

| Arquivo            | Tipos de Impacto                                    |
|--------------------|----------------------------------------------------|
| caminho/arquivo.go | Validação algorítmica, Máscara de entrada          |
| caminho/arquivo.js | Máscara de entrada                                 |

2. **Per-file details**: Following by each impacted file details, using H3 (`### caminho/arquivo.ext`) or H4 (`#### caminho/arquivo.ext`) titles for each file.

#### caminho/arquivo.go
| Linha | Tipo de Impacto         | Detalhe do Problema                       | Sugestão de Ajuste                |
|-------|------------------------|-------------------------------------------|-----------------------------------|
| 102   | Validação algorítmica   | Uso de algoritmo que só aceita dígitos    | Alterar para validar caracteres A-Z|

#### caminho/arquivo.js
| Linha | Tipo de Impacto         | Detalhe do Problema             | Sugestão de Ajuste      |
|-------|------------------------|-------------------------------|-------------------------|
| 34    | Máscara de entrada     | Máscara impede letras         | Permitir letras maiúsculas|

Required fields in each detailed table:
- **Linha**: line number (or range, if applicable)
- **Tipo de Impacto**: category of impact (Validação algorítmica, Máscara, Regex, Tipo, UI, etc)
- **Detalhe do Problema**: brief description of the problem
- **Sugestão de Ajuste**: clear suggestion for the required change

Group details by file and evaluate using H3 or H4 to denote each file, to improve report clarity.

## Agentic Guidance
Attempt a first pass autonomously unless missing critical information; stop and request clarification if success criteria are unmet or ambiguities remain.

## Verbosity and Output Parameters
- Respond concisely and in a structured manner.
- Use Markdown for the summary and detailed report tables as shown above.
- The report must be generated in the file `cnpj-alfanumerico-audit-[unixtimestamp].md`.
- Do not show reasoning unless specifically requested.

## Stop Conditions
- Deliver the report when all impacted points are listed. Request clarification if any points remain incomplete or ambiguous.

## Generating CNPJs for testing

In case you need valid CNPJs for tests, use the generate tool from cnpjota MCP
