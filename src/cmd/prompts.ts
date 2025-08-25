import {Argument, Command, Option} from 'commander'

import {writeFile} from 'fs/promises'
import {auditPrompt} from '../prompts'

const prompts = {
  audit: auditPrompt,
}

const promptsCommand = new Command('prompts')

promptsCommand
  .command('show')
  .addArgument(new Argument('<prompt>').choices(Object.keys(prompts)))
  .action(async prompt => {
    console.log(prompts[prompt as keyof typeof prompts])
  })

promptsCommand
  .command('export')
  .addArgument(new Argument('<prompt>').choices(Object.keys(prompts)))
  .addOption(new Option('-o, --output <output>', 'Output file'))
  .action(async (prompt, options) => {
    const output = options.output || `cnpjota-${prompt}-prompt.md`
    await writeFile(output, prompts[prompt as keyof typeof prompts])
    console.log(`✅ Prompt exported to ${output}`)
  })

export {promptsCommand}
