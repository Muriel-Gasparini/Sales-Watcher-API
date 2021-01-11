import { Router } from 'express'

const clientController = require('../controllers/clientController')
const productController = require('../controllers/productsController')
const receiptController = require('../controllers/receiptController')
const userController = require('../controllers/userController')
const storageController = require('../controllers/storageController')

const inputValidation = require('../middlewares/inputValidation')
const permission = require('../middlewares/permission')

import AuthenticationMiddlware from '../middlewares/auth'
import Access from '../middlewares/acessHierarchy/permissions'

import UserController from '../controllers/user/crud'
import AdminController from '../controllers/admin/crud'

const router = Router()

router.use(AuthenticationMiddlware)

//Clients

router.get('/client/:id?', permission.client, clientController.list)

router.post('/client', permission.client, inputValidation.clientCreate, clientController.create)

router.delete('/client/:id', permission.client, clientController.delete)

router.put('/client/:id', permission.client, inputValidation.clientCreate, clientController.edit)


//Products

router.get('/product/:id?', permission.product, productController.list)

router.post('/product', permission.product, inputValidation.productCreate, productController.create)

router.delete('/product/:id', permission.product, productController.delete)

router.put('/product/:id', permission.product, inputValidation.productCreate,productController.edit)


//Receipts

router.get('/receipt/:id?', permission.receipt, receiptController.list)

router.post('/receipt', permission.receipt, inputValidation.receiptCreate, receiptController.create)

router.delete('/receipt/:id', permission.receipt, receiptController.delete)


// Admins

router.post('/admin', Access.onlyAdminAccounts, AdminController.postAdmin)

router.delete('/admin/:id', Access.onlyAdminAccounts, AdminController.deleteAdmin)

router.get('/admin/:id?', Access.onlyAdminAccounts, AdminController.getAdmin)


// Users

router.post('/user', Access.onlyAdminAccounts, UserController.postUser)

router.delete('/user/:id', permission.user, userController.delete)

router.get('/user/:id?', permission.user, userController.list)

router.put('/user/:id', permission.user, userController.edit)


// Storage

router.post('/storage', storageController.createLog)

router.get('/storage/:id?', storageController.listLog)

router.delete('/storage/:id', storageController.deleteLog)

module.exports = app => app.use('/v1', router)