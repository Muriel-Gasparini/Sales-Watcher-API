const express = require('express')
const router = express.Router()

const loginController = require('../controllers/loginController')

router.post('/admin', loginController.admin)

router.post('/user', loginController.user)

module.exports = app => app.use('/login', router)