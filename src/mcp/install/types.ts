export type MCPConfig = {
  command: string
  args?: string[]
}

export type ClientOption = {
  mcp: (serverName: string, config: MCPConfig) => Promise<void>
}
