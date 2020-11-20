const api = require('../api')

class Months {
  static async initialize() {
    await api.getData()
    this.records = api.data
    this.allDates = this._getDates()
  }

  static getAggregatedList(){
    let records = this.records
    let results = []
    var formatDate = this._getFormattedDate

    this.allDates.forEach(function (month){
      let totalNumber = 0
      let totalValue = 0
    
      records.forEach(function (record){
        const date = new Date(record['paymentDate'])
        const formattedDate = formatDate(date)

        if(Date.parse(formattedDate) === Date.parse(month)){ 
          totalNumber += 1
          totalValue += record['amount']
        }
      })

      var result = {}
      result[month] = {
        "totalNumber": totalNumber, 
        "totalValue": totalValue, 
        "averageValue": (totalValue / totalNumber)
      }
      results.push(result)
    })

    return results
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