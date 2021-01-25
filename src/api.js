// Get Fetch method
var fetch = require('cross-fetch');

class Api {
  static async getData(){
    const url = "https://transactions-jigsaw.herokuapp.com/transactions"
    const response = await fetch(url)
    this.data = await response.json()
  }
}

module.exports = Api;