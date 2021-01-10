import { Router } from 'express'
const router = Router()

import AddAdminController from '../controllers/admin/create-account'
import LoginAdminController from '../controllers/admin/login'
import LoginUserController from '../controllers/user/login'

const loginController = require('../controllers/loginController')

router.post('/login/admin', LoginAdminController)

router.post('/login/user', LoginUserController)

router.post('/admin/account', AddAdminController)


module.exports = app => app.use('/', router)