function describe(description, callback) {
  this.log = { description }

  callback.bind(this)
  callback()
  //push to json file
  //{log:[], tests:{}, testSuites:{}}
}

module.exports = describe
