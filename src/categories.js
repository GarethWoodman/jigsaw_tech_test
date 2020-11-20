const api = require('./api')

class Categories {
  static async initialize(){
    await api.getData()
    this.records = api.data
    this.allNames = this._getNames()
  }

  static getAggregatedList(){
    let records = this.records
    let results = []

    this.allNames.forEach(function (category, index){
      let totalNumber = 0
      let totalValue = 0
   
      records.forEach(function (record, index){
        if(record['category'] == category){ 
          totalNumber += 1
          totalValue += record['amount']
        }
      })
   
      // Push result into list of results
      var result = {}
      result[category] = {
        "totalNumber": totalNumber, 
        "totalValue": totalValue, 
        "averageValue": (totalValue / totalNumber)
      }
       results.push(result)
     })

    return results
  }

  static _getNames(){
    let categories = []

    this.records.forEach(function (record, index){
      if(!categories.includes(record['category'])){
        categories.push(record['category'])
      }
    })

    return categories
  }
   
}

module.exports = Categories;