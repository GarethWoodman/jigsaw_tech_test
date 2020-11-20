const api = require('../api')
const values = require('../helpers/values')

class Categories {
  static async initialize(){
    // Get api data then initialize attributes
    await api.getData()
    this.records = api.data
    this.allNames = this._getNames()
  }

  // Get aggretated list by category
  static getAggregatedList(){
    let records = this.records
    let results = []

    // Iterate through all category names
    this.allNames.forEach(function (category){
      // Set the values for current category
      values.reset()
   
      // If a records category matches current category add it to values
      records.forEach(function (record){
        if(record['category'] == category){ values.add(record['amount']) }
      })
   
      // Get results of the values added to category and push to results
      results.push(values.getResult(category))
     })

    return results
  }

  // Get list of category names
  static _getNames(){
    let categories = []

    // Iterate through all records
    // If category is not included in categories array push it 
    this.records.forEach(function (record, index){
      if(!categories.includes(record['category'])){
        categories.push(record['category'])
      }
    })

    return categories
  }
   
}

module.exports = Categories;