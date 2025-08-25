import {InvalidArgumentError} from 'commander'

export function commandParseInt(value: string): number {
  const parsedValue = parseInt(value, 10)
  if (isNaN(parsedValue)) {
    throw new InvalidArgumentError('Not a number.')
  }

  return parsedValue
}
