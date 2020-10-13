const express = require('express')

const clientController = require('../controllers/clientController')
const productController = require('../controllers/productsController')
const receiptController = require('../controllers/receiptController')
const adminController = require('../controllers/adminController')
const userController = require('../controllers/userController')
const storageController = require('../controllers/storageController')

const inputValidation = require('../middlewares/inputValidation')
const permission = require('../middlewares/permission')
const authMiddleware = require('../middlewares/auth')

const router = express.Router()

router.use(authMiddleware)

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

router.post('/admin', permission.admin, adminController.create)

router.delete('/admin/:id', permission.admin, adminController.delete)

router.get('/admin/:id?', permission.admin, adminController.list)


// Users

router.post('/user', permission.user, userController.create)

router.delete('/user/:id', permission.user, userController.delete)

router.get('/user/:id?', permission.user, userController.list)


// Storage

router.post('/storage', storageController.createLog)

router.get('/storage/:id?', storageController.listLog)

router.delete('/storage/:id', storageController.deleteLog)

module.exports = app => app.use('/v1', router)