import axios from 'axios'
import Database from './firebase/index.js'

const emojies = {
  up: '\uD83D\uDC46',
  down: '\u2B07'
}

export default class Bot {
  constructor(token) {
    this.token = token
    this.membersIds = []
  }

  async sendPrice(oldPrice, newPrice) {
    try {
      this.membersIds = await Database.getMembers()

      const promises = []
      this.membersIds.forEach((id) => {
        promises.push(
          axios.post(`https://api.telegram.org/bot${this.token}/sendMessage`,
            { 
              parse_mode: 'HTML',
              chat_id: id,
              text: `${newPrice > oldPrice ? emojies.up : emojies.down} <strong>$${newPrice}</strong>`
            },
            {
              headers: { 'Content-Type': 'application/json'}
            }
          )
        )
      })

      await Promise.all(promises)
    } catch (error) {
      if (error.response.data.description === 'Forbidden: bot was blocked by the user') return
      console.error(error)
    }
  }

  async getUpdates() {
    try {      
      const { data } = await axios.get(`https://api.telegram.org/bot${this.token}/getUpdates`)
  
      data.result.forEach((item) => {
        if (item.message && !this.membersIds.includes(item.message.from.id)) {
          this.membersIds.push(item.message.from.id)
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  async saveMembers() {
    try {
      const promises = this.membersIds.map(memberId => Database.addMemberId(memberId))
      await Promise.all(promises)
    } catch (error) {
      console.error(error)
    }
  }
}
