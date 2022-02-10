import dotenv from 'dotenv'
dotenv.config()

import Bot from './bot.js'
import { contract } from './blockchain.js'
import { getBswPrice } from './helpers/index.js'

const bot = new Bot(process.env.TELEGRAM_BOT_ACCESS_TOKEN)

let oldPrice = null

async function run() {
  const reserves = await contract.functions.getReserves()
  const price = getBswPrice(reserves)
  await bot.getUpdates()

  if (oldPrice !== price) {
    await bot.sendPrice(oldPrice, price)
    oldPrice = price
  }
}

run()
setInterval(run, 30000)
