import os from 'os'
import path from 'path'
import type {ClientOption} from './types'
import {createJsonMcpInstall} from './install-json'

const homeDir = os.homedir()

const platformPaths = {
  win32: {
    baseDir: process.env.APPDATA || path.join(homeDir, 'AppData', 'Roaming'),
    vscodePath: path.join('Code', 'User', 'globalStorage'),
  },
  darwin: {
    baseDir: path.join(homeDir, 'Library', 'Application Support'),
    vscodePath: path.join('Code', 'User', 'globalStorage'),
  },
  linux: {
    baseDir: process.env.XDG_CONFIG_HOME || path.join(homeDir, '.config'),
    vscodePath: path.join('Code/User/globalStorage'),
  },
}

const platform = process.platform as keyof typeof platformPaths

const {baseDir} = platformPaths[platform]

// Define client paths using the platform-specific base directories
const clientPaths: {
  [key: string]: ClientOption
} = {
  'claude-desktop': createJsonMcpInstall(path.join(baseDir, 'Claude', 'claude_desktop_config.json')),
  'claude-code': createJsonMcpInstall(path.join(homeDir, '.claude.json')),
  cline: createJsonMcpInstall(
    path.join(
      baseDir,
      platformPaths[platform].vscodePath,
      'saoudrizwan.claude-dev',
      'settings',
      'cline_mcp_settings.json',
    ),
  ),
  roocode: createJsonMcpInstall(
    path.join(
      baseDir,
      platformPaths[platform].vscodePath,
      'rooveterinaryinc.roo-cline',
      'settings',
      'mcp_settings.json',
    ),
  ),
  windsurf: createJsonMcpInstall(path.join(homeDir, '.codeium', 'windsurf', 'mcp_config.json')),
  witsy: createJsonMcpInstall(path.join(baseDir, 'Witsy', 'settings.json')),
  enconvo: createJsonMcpInstall(path.join(homeDir, '.config', 'enconvo', 'mcp_config.json')),
  cursor: createJsonMcpInstall(path.join(homeDir, '.cursor', 'mcp.json')),
  vscode: createJsonMcpInstall(path.join(baseDir, 'Code', 'User', 'mcp.json'), 'servers'),
  boltai: createJsonMcpInstall(path.join(homeDir, '.boltai', 'mcp.json')),
  'amazon-bedrock': createJsonMcpInstall(path.join(homeDir, 'Amazon Bedrock Client', 'mcp_config.json')),
  amazonq: createJsonMcpInstall(path.join(homeDir, '.aws', 'amazonq', 'mcp.json')),
  'gemini-cli': createJsonMcpInstall(path.join(homeDir, '.gemini', 'settings.json')),
  amp: createJsonMcpInstall(path.join(homeDir, '.config', 'amp', 'settings.json'), 'amp.mcpServers'),
  opencode: createJsonMcpInstall(path.join(homeDir, '.config', 'opencode', 'opencode.json'), 'mcp', config => ({
    type: 'local',
    command: [config.command, ...(config.args || [])],
  })),
}

export const mcpClients = Object.keys(clientPaths)

export async function saveMcpConfig(
  clientType: string,
  name: string,
  command: string,
  args: string[] = [],
): Promise<void> {
  if (!clientPaths[clientType]) {
    console.log(`\n⚠️ Client ${clientType} is not supported.`)
    return
  }

  const clientConfig = clientPaths[clientType]
  const newKey = name

  await clientConfig.mcp(newKey, {command, args})
}
