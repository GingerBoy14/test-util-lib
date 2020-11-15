const express = require('express')
const router = express.Router()
const { getResultToTree, getResultToList } = require('../functions')

router.get('/:id', (req, res) => {
  switch (req.params.id) {
    case 'list': {
      getResultToList(res)
      break
    }
    case 'tree': {
      getResultToTree(res)
      break
    }
  }
})

module.exports = router
