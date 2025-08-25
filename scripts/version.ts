#!/usr/bin/env bun

const json = await Bun.file('./package.json').json()

const args = process.argv.slice(2)
let newVersion = args[0]

if (!newVersion) {
  console.log('No new version specified, bumping patch version.')
  const [major, minor, patch] = json.version.split('.').map((s: string) => parseInt(s))
  newVersion = `${major}.${minor}.${patch + 1}`
}

json.version = newVersion

await Bun.write('./package.json', JSON.stringify(json, null, 2))
console.log(`Version bumped to ${json.version}`)