import {Command} from 'commander'
import * as cnpj from '../utils/cnpj'

export const validateCommand = new Command('validate')
  .description('Validate CNPJ values')
  .argument('<cnpj>', 'CNPJ value to validate')
  .action(cnpjValue => {
    const result = cnpj.validate({cnpj: cnpjValue})
    if (result.isValid) {
      console.log('✅ CNPJ is valid')
      console.log('\n')
      console.log(`cleaned: ${result.unmasked}`)
      console.log(`masked:  ${result.masked}`)
    } else {
      console.error(`❌ CNPJ is invalid (${result.message})`)
      process.exit(1)
    }
  })
