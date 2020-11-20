const api = require('../api')
const values = require('../helpers/values')

class Categories {
  static async initialize(){
    await api.getData()
    this.records = api.data
    this.allNames = this._getNames()
  }

  static getAggregatedList(){
    let records = this.records
    let results = []

    this.allNames.forEach(function (category){
      values.reset()
   
      records.forEach(function (record){
        if(record['category'] == category){ values.add(record['amount']) }
      })
   
      results.push(values.getResult(category))
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