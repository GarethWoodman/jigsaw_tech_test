const api = require('../api')
const values = require('../helpers/values')

class Dates {
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
      // If a records date matches current date add it to values
      records.forEach(function (record){
        let recordDate = formatDate(new Date(record['paymentDate'])    )
        if(recordDate == date){ values.add(record['amount']) } 
      })

      // Get results of the values added to date and push to results
      results.push(values.getResult(date))
    })

    return results
  }

  // Get list of dates
  static _getAllDates() {
    this._getStartAndEnd()

    // Start from the first day of the first month
    let start = new Date(this.startDate.getFullYear() + "-" + (this.startDate.getMonth() + 1 ) + "-01")
    // End on the final date
    let end = new Date(this.endDate.getFullYear() + "-" + ( this.endDate.getMonth() + 1 ) + "-" + ( this.endDate.getDate() + 1) )

    // Get all possible dates from start to end
    for(var dates=[],date=new Date(start); date<=end; date.setDate(date.getDate()+1)){
      dates.push(this._getFormattedDate(new Date(date)));
    }
    
    return dates
  }

  // Return a formatted string of Date Object
  static _getFormattedDate(date){
    let day = date.getDate()
    if(day < 10){ day = ("0" + day) }
    const month = (date.getMonth() + 1)
    const year = date.getFullYear()
    return day + "/" + month+ "/" + year
  }

  // Get starting and ending months
  static _getStartAndEnd() {
    var dates = []
    this.records.forEach(function (record){
      dates.push(new Date(record['paymentDate']))
    })

    this.startDate = new Date(Math.min(...dates))
    this.endDate = new Date(Math.max(...dates))
  }
}

module.exports = Dates;