import dotenv from 'dotenv'
dotenv.config()

import { ethers } from 'ethers'

import { parse } from './helpers/index.js'

const abi = parse(new URL('./data/abi.json', import.meta.url))

const provider = new ethers.providers.JsonRpcProvider(process.env.BSC_DATASEED_URL, { chainId: 56 })
export const contract = new ethers.Contract(process.env.BSW_USDT_PAIR_ADDRESS, abi, provider)
