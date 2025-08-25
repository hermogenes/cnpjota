import {getCurrentVersion} from './version' with {type: 'macro'}

export const ASCII_LOGO = [
  '░█▀▀░█▀█░█▀█░▀▀█░█▀█░▀█▀░█▀█',
  '░█░░░█░█░█▀▀░░░█░█░█░░█░░█▀█',
  '░▀▀▀░▀░▀░▀░░░▀▀░░▀▀▀░░▀░░▀░▀',
  '',
  '',
].join('\n')

export const COMMAND_BANNER = `${ASCII_LOGO}\n\nVersion: ${getCurrentVersion()}`
