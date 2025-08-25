# cnpjota - MCP Server & CLI

[![npm version](https://img.shields.io/npm/v/cnpjota.svg)](https://www.npmjs.com/package/cnpjota)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📋 Sobre o Projeto

O **cnpjota** é uma tool que oferece suporte para a mudança do formato do CNPJ brasileiro, que será implementada a partir de 2026. O projeto inclui um **servidor MCP (Model Context Protocol)** para análise de códigos e um **CLI** para validação, geração e auditoria de CNPJs.

### Prompt

O principal item dessa ferramenta é o [prompt para auditoria](./prompts/audit.md).

Você pode tanto copiar o prompt ou usar o MCP server caso o seu cliente suporte o uso de prompts via MCP.

### Clientes que suportam prompt via MCP

- GitHub Copilot
- Cursor
- Claude Code
- Gemini CLI

Caso alguma ferramenta não esteja listada, isso não significa que ela não suporte o uso de prompts via MCP.

Se você identificar alguma ferramenta que deveria estar na lista, sinta-se à vontade para contribuir!

## 🛠️ Instalação

### Requisitos

- Node.js >= 18.0.0 ou Bun >= 1.0.0
- Cliente MCP (Claude Code, Cursor, etc.) para funcionalidades de auditoria

### Instalação do Servidor MCP (recomendado)

Use o comando de instalação automática para seu cliente MCP:

```bash
# Claude Code
npx cnpjota mcp install claude-code

# Cursor
npx cnpjota mcp install cursor

# VS Code
npx cnpjota mcp install vscode

# Gemini CLI
npx cnpjota mcp install gemini-cli
```

O comando irá automaticamente configurar o servidor MCP no cliente especificado.

### Salvar prompt como arquivo (caso client não suporte prompts via MCP)

```bash
npx cnpjota prompts export
```

## 🚀 Uso em clients com suporte MCP

Após a instalação, você pode usar o MCP para utilizar o prompt diretamente do seu cliente.

### Claude Code

```bash
/cnpjota:cnpj-alfa-audit (MCP)
```

### GitHub Copilot

```bash
/mcp.cnpjota.cnpj-alfa-audit
```

### Cursor

```bash
/cnpjota/cnpj-alfa-audit
```

### Gemini CLI

```bash
/cnpj-alfa-audit
```

## Uso em clients sem suporte MCP

Caso seu cliente não suporte o uso de prompts via MCP, você pode utilizar salvar o prompt como arquivo e sugerir o agent a utilizá-lo.

Exemplo:

```bash
npx cnpjota prompts export cnpj-audit-prompt.md
```
**Prompt**

```markdown
Utilize o prompt no arquivo cnpj-audit-prompt.md e verifique a compatilidade do repositório com o CNPJ alfanumérico
```

### CLI

#### Validar CNPJ

```bash
# Formato atual (14 dígitos)
npx cnpjota validate 11222333000181

# Futuro formato alfanumérico
npx cnpjota validate 0H.9WI.675/08G8-11
```

#### Gerar CNPJ

```bash
# Gerar CNPJ válido
npx cnpjota generate

# Gerar múltiplos CNPJs
npx cnpjota generate --count 5
```

## 💻 Desenvolvimento

### Configuração do Ambiente

```bash
# Instale dependências
bun install

# Execute verificação de tipos
bun run typecheck

# Execute em modo de desenvolvimento
bun run dev
```

### Estrutura do Projeto

```
cnpj-alfanumerico/
├── packages/
│   └── cli/                    # CLI e servidor MCP
│       ├── src/
│       │   ├── cmd/           # Comandos do CLI
│       │   ├── mcp/           # Servidor MCP
│       │   ├── utils/         # Utilitários
│       │   └── clients/       # Clientes para APIs externas
│       └── package.json
├── package.json               # Configuração do workspace
└── README.md
```

### Build

```bash
bun run build
```

## 🤝 Contribuições

Contribuições são bem-vindas!

## TODO

- [ ] Adicionar mais exemplos
- [ ] Adicionar tests
- [ ] Automatizar publicação do pacote
- [ ] Melhorar a documentação
- [ ] Implementar suporte a outros clientes

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## ⚠️ Disclaimer

Este projeto é uma ferramenta de auxílio para a transição do formato CNPJ. As informações sobre a mudança do formato são baseadas nas diretrizes oficiais disponíveis publicamente. Sempre consulte as fontes oficiais da Receita Federal para informações atualizadas sobre a implementação.

## 🔗 Links Úteis

- [Documentação da Receita Federal](https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/acoes-e-programas/programas-e-atividades/cnpj-alfanumerico)