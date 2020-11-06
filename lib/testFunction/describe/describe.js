function describe(description, callback) {
  this.log = { description }
  callback.bind(this)
  callback()
}

module.exports = describe
