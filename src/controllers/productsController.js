const Product = require('../database/models/Product')
const Storage = require('../database/models/Storage')

exports.create = async (req, res) => {
    
    const { name, price, userID } = req.body

    let { quantity } = req.body

    try {

        const product = await Product.create({
            name,
            price
        })

        if(!quantity || quantity == undefined) {

            await Storage.create({
                productID: product._id,
                cadastrator: userID
            })

        } 
      
        for (; 0 < quantity; quantity--) {

            await Storage.create({
                productID: product._id,
                cadastrator: userID
            })
        }
       
        return res.status(201).json({ message: 'You have successfully registered your product' })

    } catch (error) {
        
        return res.status(400).json({ error: 'Make sure you have sent all required data' })
    }
}

exports.list = async (req, res) => {

    const { id } = req.params

    try {

        const products = !id ? await Product.find() : await Product.findOne({ _id: id })
        
        if (products.length < 1) return res.status(400).json({ error: 'There are no products with this ID'})
        
        return res.status(200).json({ products })

    } catch (error) {

        return res.status(400).json({ error: 'An error occurred while listing products, make sure the ID is correct.' })
    }
}

exports.edit = async (req, res) => {

    const { name, price } = req.body

    const { id } = req.params

    try {

        if (!id) return res.status(400).json({ error: 'Please inform the product ID' })

        const product = await Product.findOne({ _id: id })

        if (product == null) return res.status(400).json({ error: 'There are no products with this ID'})

        product.name = name || product.name
        product.price = price || product.price
        product.updatedAt = Date.now()
        
        await product.save()

        return res.status(200).json(product)

    } catch (error) {
        
        return res.status(500).json({ error: 'An error occurred while editing product data' })
    }
}

exports.delete = async (req, res) => {

    const { id } = req.params

    try {

        if (!id) return res.status(400).json({ error: 'Please inform the product ID' })

        const product = await Product.findById({ _id: id })

        await Storage.deleteMany({ productID: product._id })
        
        await Product.findByIdAndDelete({ _id: id })

        return res.status(200).json({ message: 'Product successfully deleted' })

    } catch (error) {

        return res.status(400).json({ error: 'There was an error deleting the product, make sure the ID is correct.' })
    }
}