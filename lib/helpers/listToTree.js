const listToTree = (list) => {
  const buffer = list.filter(({ expects }) => !expects)

  list = list.filter(({ expects }) => expects)
  let log = []
  list.forEach(() => {
    let buf = list.filter(({ path }) => path === list[0].path)
    list.splice(0, buf.length)
    let temp = { path: buf[0].path, describe: [] }

    let curDesc = false,
      setDesc
    buf.forEach(({ description, it, expects }) => {
      setDesc = curDesc.description === description
      if (!setDesc) {
        curDesc = { description, it: [] }
      }

      curDesc.it.push({ name: it, expects })
      if (!setDesc && curDesc) {
        temp.describe.push(curDesc)
      }
    })
    log.push(temp)
  })

  return buffer.concat(log)
}

module.exports = listToTree
