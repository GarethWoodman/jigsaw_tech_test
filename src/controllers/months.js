const api = require('../api')

class Months {
  static async initialize() {
    await api.getData()
    this.records = api.data
    this.allDates = this._getDates()
  }

  static _getDates() {
    var months = []
    var formatDate = this._getFormattedDate

    this.records.forEach(function (record){
      const date = new Date(record['paymentDate'])
      const formattedDate = formatDate(date)
      if(!months.includes(formattedDate)){ months.push(formattedDate) }
    })

    return months
  }

  static _getFormattedDate(date){
    const month = (date.getMonth() + 1)
    const year = date.getFullYear()
    return month + "/01/" + year
  }
}

module.exports = Months;