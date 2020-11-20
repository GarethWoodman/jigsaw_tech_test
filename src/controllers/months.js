const api = require('../api')
const values = require('../helpers/values')

class Months {
  static async initialize() {
    // Get api data then initialize attributes
    await api.getData()
    this.records = api.data
    this.allDates = this._getAllDates()
  }

  // Get aggretated list by month
  static getAggregatedList(){
    let records = this.records
    let results = []
    let formatDate = this._getFormattedDate

    // Iterate through all dates
    this.allDates.forEach(function (date){
      // Set the values for current category
      values.reset()
      // If a records date matches current month/date add it to values
      records.forEach(function (record){
        let recordDate = formatDate(new Date(record['paymentDate'])    )
        if(recordDate == date){ values.add(record['amount']) } 
      })

      // Get results of the values added to month and push to results
      results.push(values.getResult(date))
    })

    return results
  }

  // Get list of dates
  static _getAllDates() {
    let start = new Date("2020-10-01")
    let end = new Date("2020-12-01")

    for(var dates=[],date=new Date(start); date<=end; date.setDate(date.getDate()+1)){
      dates.push(this._getFormattedDate(new Date(date)));
    }
    
    return dates
  }

  // Return a formatted string of Date Object
  static _getFormattedDate(date){
    const day = date.getDate()
    const month = (date.getMonth() + 1)
    const year = date.getFullYear()
    return day + "/" + month+ "/" + year
  }
}

module.exports = Months;