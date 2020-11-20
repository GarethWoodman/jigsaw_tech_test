const api = require('./api')

class Categories {
  static async initialize(){
    await api.getData()
    this.records = api.data
    this.allNames = this._getNames()
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