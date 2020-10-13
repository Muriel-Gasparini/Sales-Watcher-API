const Storage = require('../models/Storage')
const _ = require('lodash')

exports.createLog = async (req, res) => {

    const { cadastrator, productID, quantity } = req.body

    try {

        if (quantity > 1) {

            for (n = quantity; 0 < n; n--) {

                await Storage.create({
                    cadastrator: cadastrator,
                    productID: productID
                })
            }

        } else {

            await Storage.create({
                cadastrator: cadastrator,
                productID: productID
            })

        }

        return res.status(200).json({
            message: quantity > 1 ? `The quantity of ${quantity} units has been added` : 'A unit has been added'
        })

    } catch (error) {

        res.status(400).json({ error: 'An error occurred while creating your items, check the data sent.' })
    }
}

exports.listLog = async (req, res) => {

    const { id } = req.params

    try {

        const productStorage = id ? await Storage.find({ productID: id }) : await Storage.find()

        res.status(200).json({ 
            quantity: productStorage.length,
            storage: productStorage
        })

    } catch (error) {

        return res.status(400).json({ error: 'An error ocurred while fetching items from stock'})
    }
}

exports.deleteLog = async (req, res) => { 

    const { id } = req.params
    const { quantity } = req.body

    try {

        if (quantity > 1) {

            for (n = quantity; 0 < n; n--) {

                await Storage.deleteOne({ productID: id })
            }
        } else {

            await Storage.deleteOne({ productID: id })
        }

        return res.status(200).json({ message: quantity > 1 ? `The quantity of ${quantity} products has been removed from stock` : 'A product unit has been removed from stock'})

    } catch (error) {
        
        return res.status(400).json({ error: 'There was an error deleting an item'})
    }
}