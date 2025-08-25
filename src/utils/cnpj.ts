import {z} from 'zod'
import {randomInt} from 'crypto'

export const ValidateInput = z.object({
  cnpj: z.string(),
})

const ValidateSuccessResult = z.object({
  isValid: z.literal(true),
  masked: z.string(),
  unmasked: z.string(),
})

const ValidateErrorResult = z.object({
  isValid: z.literal(false),
  message: z.string(),
})

export const ValidateCnpjResult = z.discriminatedUnion('isValid', [ValidateSuccessResult, ValidateErrorResult])

export const GenerateInput = z.object({
  count: z.number().optional().default(1),
})

export const GenerateCnpjResult = z.array(z.string())

type ValidateInput = z.infer<typeof ValidateInput>
type ValidateCnpjResult = z.infer<typeof ValidateCnpjResult>
type GenerateInput = z.infer<typeof GenerateInput>
type GenerateCnpjResult = z.infer<typeof GenerateCnpjResult>

const isDigit = (char: string) => char.charCodeAt(0) < 58
const repeat = (char: string, times: number) => Array<string>(times).fill(char)

const validChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const validCharactersBase = validChars.flatMap(char => repeat(char, isDigit(char) ? 10 : 1))
const validCharactersOrder = validChars.flatMap(char => repeat(char, isDigit(char) ? 20 : 1))

export const unmask = (cnpj: string) => {
  return cnpj.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()
}

export const mask = (cnpj: string) => {
  return cnpj.replace(/([A-Z0-9]{2})([A-Z0-9]{3})([A-Z0-9]{3})([A-Z0-9]{4})(\d{2})/, '$1.$2.$3/$4-$5')
}

const calculateDigits = (cnpj: string) => {
  const unmaskedCnpj = unmask(cnpj)

  if (unmaskedCnpj.length < 12) {
    throw new Error('CNPJ must be at least 12 characters long to calculate digits')
  }

  const weights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

  let sumDv1 = 0
  let sumDv2 = 0

  for (let i = 0; i < 12; i++) {
    const digit = unmaskedCnpj.charCodeAt(i) - 48

    sumDv1 += weights[i + 1]! * digit
    sumDv2 += weights[i]! * digit
  }

  const mod11 = (sum: number) => {
    const mod = sum % 11
    return mod < 2 ? 0 : 11 - mod
  }

  const dv1 = mod11(sumDv1)

  sumDv2 += weights[12]! * dv1

  const dv2 = mod11(sumDv2)

  return `${dv1}${dv2}`
}

export const validate = (input: ValidateInput): ValidateCnpjResult => {
  const {cnpj} = input

  const unmasked = unmask(cnpj)

  if (unmasked.length !== 14) {
    return {isValid: false, message: 'CNPJ must be 14 characters long'}
  }

  if (!unmasked.match(/^[A-Z0-9]{12}[0-9]{2}$/)) {
    return {
      isValid: false,
      message: 'Invalid CNPJ format (must be 12 alphanumeric characters and 2 numeric digits)',
    }
  }

  if (unmasked.match(/^([0-9])\1{13}$/)) {
    return {
      isValid: false,
      message: 'Invalid CNPJ (all digits are the same)',
    }
  }

  const digits = calculateDigits(unmasked)

  if (digits !== unmasked.slice(12, 14)) {
    return {isValid: false, message: 'Invalid CNPJ verification digits'}
  }

  return {isValid: true, masked: mask(unmasked), unmasked}
}

const generateValidCnpj = (): GenerateCnpjResult[number] => {
  const cnpjChars: string[] = []

  for (let i = 0; i < 8; i++) {
    cnpjChars.push(validCharactersBase[randomInt(0, validCharactersBase.length - 1)]!)
  }

  for (let i = 0; i < 4; i++) {
    cnpjChars.push(validCharactersOrder[randomInt(0, validCharactersOrder.length - 1)]!)
  }

  const cnpjWithoutDigits = cnpjChars.join('')
  const digits = calculateDigits(cnpjWithoutDigits)

  return mask(`${cnpjWithoutDigits}${digits}`)
}

export const generate = (input: GenerateInput): GenerateCnpjResult =>
  Array.from({length: input.count}, generateValidCnpj)
