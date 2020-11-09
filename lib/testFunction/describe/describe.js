function describe(description, callback) {
  this.log = { description } //it's temporary var
  callback.bind(this)
  callback()
}

module.exports = describe
