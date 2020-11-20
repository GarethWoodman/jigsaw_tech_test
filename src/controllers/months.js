const api = require('../api')

class Months {
  static async initialize() {
    await api.getData()
    this.records = api.data
    this.allDates = this._getDates()
  }

  static _getDates() {
    var months = []

    this.records.forEach(function (record){
      const date = new Date(record['paymentDate'])
      const currentMonth = (date.getMonth() + 1)
      const year = date.getFullYear()
      const formattedDate = currentMonth + "/01/" + year
      
  
      if(!months.includes(formattedDate)){ months.push(formattedDate) }
    })

    return months
  }
}

module.exports = Months;