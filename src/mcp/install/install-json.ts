import type {MCPConfig} from './types'
import fs from 'fs/promises'
import {existsSync} from 'fs'
import path from 'path'

export const createJsonMcpInstall = (
  filePath: string,
  key: string = 'mcpServers',
  format?: (config: MCPConfig) => unknown,
) => ({
  mcp: (serverName: string, config: MCPConfig) => installMcpViaJsonFile(filePath, serverName, config, key, format),
})

export const installMcpViaJsonFile = async (
  filePath: string,
  serverName: string,
  config: MCPConfig,
  key: string = 'mcpServers',
  format?: (config: MCPConfig) => unknown,
) => {
  const exists = existsSync(filePath)
  let configFile = {[key]: {} as Record<string, unknown>}

  if (!exists) {
    await fs.mkdir(path.dirname(filePath), {recursive: true})
  } else {
    const data = await fs.readFile(filePath, 'utf-8')
    configFile = JSON.parse(data)
  }

  if (!configFile[key]) {
    configFile[key] = {}
  }

  configFile[key][serverName] = format ? format(config) : config

  await fs.writeFile(filePath, JSON.stringify(configFile, null, 2))
  console.log(`✅ Configuration saved to: ${filePath}`)
}
