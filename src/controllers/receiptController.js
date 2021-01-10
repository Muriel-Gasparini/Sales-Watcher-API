const Client = require('../database/models/Client')
const Product = require('../database/models/Product')
const Receipt = require('../database/models/Receipt')
const Storage = require('../database/models/Storage')

exports.create = async (req, res) => {

    const { clientID, products } = req.body

    products.forEach(async product => {

        const inStock = await Storage.find({ productID: product.ID, sold: false })

        if (product.quantity > inStock.length) return res.status(400).json({ error: 'Receipt not made due to lack of products in stock' })
    
        for (; 0 < product.quantity; product.quantity--) {

            const storage = await Storage.findOne({ productID: product.ID, sold: false })

            storage.sold = true

            await storage.save()
        }
    })

    try {

        const client = await Client.findById(clientID)

        const productModel = await Product.find()

        const productReceipt = productModel.filter(product => {

            for(i in products){

                return products[i].ID == product._id 
            }
            
        }).map(product => {

            for(i in products){
                
                if(products[i].ID == product._id) {

                    product = {
                        _id: product._id,
                        name: product.name,
                        price: product.price,
                        quantity: products[i].quantity
                    }

                    return product
                }
            }
        })

        const receipt = await Receipt.create({
            clientID: client._id,
            clientName: client.name,
            products: productReceipt
        })

        res.status(201).json({
            receipt: {
                receiptID: receipt._id,
                createdAt: receipt.createdAt,
                clientID: receipt.clientID,
                clientName: receipt.clientName,
                products: receipt.products
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'There was an error launching your receipt' })
    }
}

exports.list = async (req, res) => {

    const { id } = req.params

    try {

        const receipt = !id ? await Receipt.find() : await Receipt.find({ _id: id })

        if (receipt.length < 1) return res.status(400).json({ error: 'There are no receipts with this ID' })

        const receipts = receipt.map((data, index) => {
            return {
                order: index,
                receiptID: data._id,
                createdAt: data.createdAt,
                clientID: data.clientID,
                clientName: data.clientName,
                products: data.products
            }
        })

        return res.status(200).json({ receipts })

    } catch (error) {

        return res.status(500).json({ error: 'There was an error listing your receipts, make sure the ID is correct.' })
    }
}

exports.delete = async (req, res) => {

    const { id } = req.params

    try {

        if (!id) return res.status(400).json({ error: 'Please inform the product ID' })

        const receipt = await Receipt.deleteOne({ _id: id })

        if (receipt.deletedCount == 0) return res.status(400).json({ error: 'There are no receipts with this ID' })

        return res.status(200).json({ message: 'Receipt successfully deleted' })

    } catch (error) {

        return res.status(500).json({ error: 'There was an error deleting the receipt, make sure the ID is correct.' })
    }
}