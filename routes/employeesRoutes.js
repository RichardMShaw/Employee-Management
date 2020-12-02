const router = require('express').Router()
const dbKey = require('../keys')
const db = mysql.createConnection(dbKey)

router.post('/employees', (req, res) => {

})

module.exports = router