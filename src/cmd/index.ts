import {program} from 'commander'
import {COMMAND_BANNER} from '../constants'
import {mcpCommand} from './mcp'
import {validateCommand} from './validate'
import {generateCommand} from './generate'
import {currentVersion} from '../version'
import {promptsCommand} from './prompts'

program
  .name('cnpjota')
  .version(currentVersion)
  .description('CLI for CNPJ alphanumeric compatibility')
  .addHelpText('beforeAll', COMMAND_BANNER)

program.addCommand(mcpCommand)
program.addCommand(promptsCommand)
program.addCommand(generateCommand)
program.addCommand(validateCommand)

export const cmd = program
