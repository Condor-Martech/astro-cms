# Astro CMS — Convenções do Repositório

## Branches

- `main` e `staging` são permanentes e protegidas — sem push direto, apenas via PR.
- Trabalho novo parte de `staging` em `feat/<nome>`, `fix/<nome>` ou `chore/<nome>`.
- `spike/<nome>` é descartável: nunca é mergeada, serve só para extrair o achado para o PRD/SPEC.

## Fluxo

`feat|fix|chore` → PR → `staging` (1 aprovação + CI verde) → validação de QA → PR → `main` (aprovação manual).

## Commits

Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, ...). Commits com uso relevante de IA levam a tag `[ai-assisted: <modelo>]` no corpo da mensagem.

## Pull Requests

Use o template em `.github/PULL_REQUEST_TEMPLATE.md`. Todo PR referencia a issue que fecha (ex.: `AST-N`) e cobre com teste o(s) cenário(s) Gherkin correspondente(s) de `02-spec.md` §5.
