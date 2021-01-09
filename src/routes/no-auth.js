import express from 'express'
import AddAdminController from '../controllers/admin/add'

const router = express.Router()

const loginController = require('../controllers/loginController')


router.post('/login/admin', loginController.admin)

router.post('/login/user', loginController.user)

router.post('/admin/account', AddAdminController)


module.exports = app => app.use('/', router)