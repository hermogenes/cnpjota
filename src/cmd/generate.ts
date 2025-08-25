import {Command} from 'commander'
import {commandParseInt} from '../utils/parse-int'
import * as cnpj from '../utils/cnpj'

export const generateCommand = new Command('generate')
  .description('Generate random CNPJ values')
  .option<number>('-c, --count <count>', 'Number of CNPJ values to generate', commandParseInt, 1)
  .action(options => {
    const result = cnpj.generate(options)

    console.log(result.join('\n'))
  })
