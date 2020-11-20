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
    var averageValue = this.totalValue / this.totalNumber

    if (this.totalNumber == 0 || this.totalValue == 0) {
      averageValue = 0
    }

    result[attribute] = {
      "totalNumber": this.totalNumber, 
      "totalValue": this.totalValue, 
      "averageValue": averageValue
    }
    this.reset()
    return result
  }
}

module.exports = Values;