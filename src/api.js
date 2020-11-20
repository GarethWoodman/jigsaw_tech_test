// Get Fetch method
var fetch = require('cross-fetch');

class Api {
  static async getData(){
    const url = "http://54.154.227.172:3000/transactions"
    const response = await fetch(url)
    this.data = await response.json()
  }
}

module.exports = Api;