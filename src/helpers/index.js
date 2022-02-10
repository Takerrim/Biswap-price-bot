import { writeFileSync, readFileSync } from 'fs'

export const save = (members, path) => {
  const data = [...new Set([...parse(path), ...members])]
  writeFileSync(path, JSON.stringify(data))
}

export const parse = (path) => JSON.parse(readFileSync(path).toString())

export const getBswPrice = (reserves) => (reserves[0].toString() / reserves[1].toString()).toPrecision(3)
