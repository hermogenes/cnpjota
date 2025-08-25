import {currentVersion} from './version'

export const ASCII_LOGO = [
  '░█▀▀░█▀█░█▀█░▀▀█░█▀█░▀█▀░█▀█',
  '░█░░░█░█░█▀▀░░░█░█░█░░█░░█▀█',
  '░▀▀▀░▀░▀░▀░░░▀▀░░▀▀▀░░▀░░▀░▀',
  '',
  '',
].join('\n')

export const COMMAND_BANNER = `${ASCII_LOGO}\n\nVersion: ${currentVersion}`
