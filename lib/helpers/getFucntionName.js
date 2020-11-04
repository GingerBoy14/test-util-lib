function getFunctionName() {
  return getFunctionName.caller.name
}

module.exports = getFunctionName
