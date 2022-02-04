const axios = require('axios').default
const { save, parse } = require('./helpers/fs')

const emojies = {
  arrowUp: '\u2B06',
  arrowDown: '\u2B07'
}

class Bot {
  constructor(token) {
    this.token = token
    this.members = parse()
  }

  async sendPrice(oldPrice, newPrice) {
    try {
      this.members = parse()

      const promises = []
      this.members.forEach((id) => {
        promises.push(
          axios.post(`https://api.telegram.org/bot${this.token}/sendMessage`,
            { 
              parse_mode: 'HTML',
              chat_id: id,
              text: `${newPrice > oldPrice ? emojies.arrowUp : emojies.arrowDown} <strong>$${newPrice}</strong>`
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
    const { data } = await axios.get(`https://api.telegram.org/bot${this.token}/getUpdates`)

    data.result.forEach((item) => {
      if (item.message && !this.members.includes(item.message.from.id)) {
        this.members.push(item.message.from.id)
      }
    })

    save(this.members)
  }
}

module.exports = Bot
