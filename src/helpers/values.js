class Values {
  static reset() {
    this.totalNumber = 0
    this.totalValue = 0
  }

  static add(recordAttribute) {
    this.totalNumber += 1
    this.totalValue += recordAttribute
  }

  static getResult(attribute) {
    var result = {}
    result[attribute] = {
      "totalNumber": this.totalNumber, 
      "totalValue": this.totalValue, 
      "averageValue": (this.totalValue / this.totalNumber)
    }
    this.reset()
    return result
  }
}

module.exports = Values;