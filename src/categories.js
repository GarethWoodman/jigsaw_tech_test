const api = require('./api')

class Categories {
  static async initialize(){
    await api.getData()
    this.records = api.data
  }

  static getAll(){
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