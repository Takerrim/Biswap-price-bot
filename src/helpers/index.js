import { writeFileSync, readFileSync } from 'fs'

export const save = (members, path) => {
  const data = [...new Set([...parse(path), ...members])]
  writeFileSync(path, JSON.stringify(data))
}

export const parse = (path) => JSON.parse(readFileSync(path).toString())

/**
 * @param {Array<number>} reserves
 */
export const getBswPrice = ([base, quote]) => (base.toString() / quote.toString()).toPrecision(3)
