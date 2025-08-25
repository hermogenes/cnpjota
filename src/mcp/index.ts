import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js'
import {StdioServerTransport} from '@modelcontextprotocol/sdk/server/stdio.js'
import {auditPrompt} from '../prompts'
import {generate, validate, GenerateCnpjResult, ValidateCnpjResult, ValidateInput, GenerateInput} from '../utils/cnpj'
import {getCurrentVersion} from '../version' with {type: 'macro'}

const server = new McpServer({
  name: 'cnpjota-mcp',
  version: getCurrentVersion(),
})

server.registerPrompt(
  'cnpj-alfa-audit',
  {
    title: 'cnpj-alfa-audit',
    description: 'Audit the codebase for CNPJ alphanumeric compatibility',
  },
  async () => ({
    messages: [
      {
        role: 'user',
        content: {
          type: 'text',
          text: auditPrompt,
        },
      },
    ],
  }),
)

server.registerTool(
  'generate',
  {
    title: 'Generate random valid CNPJ values',
    description: 'Generate random valid CNPJ values',
    inputSchema: GenerateInput.shape,
    outputSchema: {
      result: GenerateCnpjResult,
    },
  },
  async input => {
    const result = generate(input)
    return {
      content: [{type: 'text', text: JSON.stringify({result}, null, 2)}],
      structuredContent: {result},
    }
  },
)

server.registerTool(
  'validate',
  {
    title: 'Validate CNPJ',
    description: 'Validate a CNPJ',
    inputSchema: ValidateInput.shape,
    outputSchema: {
      result: ValidateCnpjResult,
    },
  },
  async input => {
    const result = validate(input)
    return {
      content: [{type: 'text', text: JSON.stringify({result}, null, 2)}],
      structuredContent: {result},
    }
  },
)

const transport = new StdioServerTransport()

export const startMcpServer = async () => {
  await server.connect(transport)
}
