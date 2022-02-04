const dotenv = require('dotenv')
dotenv.config()

const { ethers } = require("ethers");
const abi = require('./data/abi.json')

const Bot = require('./bot')

const getBswPrice = (reserves) => (reserves[0].toString() / reserves[1].toString()).toPrecision(3)

const bot = new Bot(process.env.TELEGRAM_BOT_ACCESS_TOKEN)
const provider = new ethers.providers.JsonRpcProvider(process.env.BSC_DATASEED_URL, { chainId: 56 })
const contract = new ethers.Contract(process.env.BSW_USDT_PAIR_ADDRESS, abi, provider)

let oldPrice = null

async function run() {
  const reserves = await contract.functions.getReserves()
  const bswPrice = getBswPrice(reserves)
  await bot.getUpdates()

  if (oldPrice !== bswPrice) {
    await bot.sendPrice(oldPrice, bswPrice)
    oldPrice = bswPrice
  }
}

run()
setInterval(run, 30000)
