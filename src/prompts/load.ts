import fs from 'fs'

export const getAuditPrompt = (): string => {
  const text = fs.readFileSync('./prompts/audit.md', 'utf-8')
  return text
}
