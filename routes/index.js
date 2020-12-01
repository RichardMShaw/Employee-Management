const router = require('express').Router()

router.use('/api', require('./employeesRoutes.js'))
module.exports = routes