const { writeFileSync, readFileSync } = require('fs')
const path = require('path')

const MEMBERS_PATH = path.resolve(__dirname, '../data/memberIds.json')

const save = (members) => writeFileSync(MEMBERS_PATH, JSON.stringify(members))

const parse = () => JSON.parse(readFileSync(MEMBERS_PATH).toString())

exports.save = save
exports.parse = parse
