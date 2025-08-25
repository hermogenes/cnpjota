import {Argument, Command} from 'commander'
import {startMcpServer} from '../mcp'
import {mcpClients, saveMcpConfig} from '../mcp/install'

const mcpCommand = new Command('mcp')

mcpCommand
  .command('run')
  .description('Run cnpjota MCP server')
  .action(async () => {
    await startMcpServer()
  })

mcpCommand
  .command('install')
  .description('Install cnpjota MCP server to specific client')
  .addArgument(new Argument('<client>', 'Client to install MCP server').choices(mcpClients))
  .action(async client => {
    console.log(`Installing cnpjota MCP server to client: ${client}`)

    await saveMcpConfig(client, 'cnpjota', 'npx', ['cnpjota', 'mcp', 'run'])
  })

export {mcpCommand}
