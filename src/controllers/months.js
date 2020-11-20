const api = require('../api')
const values = require('../helpers/values')

class Months {
  static async initialize() {
    // Get api data then initialize attributes
    await api.getData()
    this.records = api.data
    this.allDates = this._getDates()
  }

  // Get aggretated list by month
  static getAggregatedList(){
    let records = this.records
    let results = []
    var formatDate = this._getFormattedDate

    // Iterate through all months/dates
    this.allDates.forEach(function (month){
      // Set the values for current category
      values.reset()
    
      // If a records month/date matches current month/date add it to values
      records.forEach(function (record){
        const date = new Date(record['paymentDate'])
        const formattedDate = formatDate(date)

        if(Date.parse(formattedDate) === Date.parse(month)){ values.add(record['amount']) }
      })

      // Get results of the values added to month and push to results
      results.push(values.getResult(month))
    })

    return results
  }

  // Get list of months/dates
  static _getDates() {
    var months = []
    var formatDate = this._getFormattedDate

    // Iterate through all records
    // If month/date is not included in months push it
    this.records.forEach(function (record){
      const date = new Date(record['paymentDate'])
      const formattedDate = formatDate(date)
      if(!months.includes(formattedDate)){ months.push(formattedDate) }
    })

    return months
  }

  // Return a formatted string of Date Object
  static _getFormattedDate(date){
    const month = (date.getMonth() + 1)
    const year = date.getFullYear()
    return month + "/01/" + year
  }
}

module.exports = Months;