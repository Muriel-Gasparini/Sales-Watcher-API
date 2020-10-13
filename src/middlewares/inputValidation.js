const Joi = require('joi')

exports.productCreate = async (req, res, next) => {

    const { name, price, quantity, userID } = req.body

    const schema = Joi.object({
        
        name: req.method == "PUT" ? Joi.string().min(2) : Joi.string().required().min(2),

        price: req.method == "PUT" ? Joi.string().regex(new RegExp(/\d+,\d+/)) : Joi.string().regex(/^\d+,\d+$/).required(),
        
        quantity: req.method == "PUT" ? Joi.number().integer() : Joi.number().integer().required(),

        userID: req.method == "PUT" ? Joi.string() : Joi.string().required()
    })

    const { error } = schema.validate({ name, price, quantity, userID })

    if (error) return res.status(400).json({ error: error.message.replace(/"+/g, '') })

    return next()
}

exports.clientCreate = (req, res, next) => {

    const { name, email, phoneNumber, deliveryPlace } = req.body

    const schema = Joi.object({

        name: req.method == "PUT" ? Joi.string().min(2) : Joi.string().min(2).required(),

        email: req.method == "PUT" ? Joi.string().regex(new RegExp(/.+@.+\..+/)) : Joi.string().regex(new RegExp(/.+@.+\..+/)).required(),

        phoneNumber: req.method == "PUT" ? Joi.string().regex(/^\d+$/) : Joi.string().regex(/^\d+$/).required(),

        deliveryPlace: req.method == "PUT" ? Joi.string() : Joi.string().required()
    })

    const { error } = schema.validate({ name, email, phoneNumber, deliveryPlace })

    if (error) return res.status(400).json({ error: error.message.replace(/"+/g, '') })
    
    return next()
}

exports.receiptCreate = (req, res, next) => {

    const { userID, clientID, products } = req.body

    const schema = Joi.object({

        userID: Joi.string().required(),

        clientID: Joi.string().min(15).alphanum().required(),

        products: Joi.array().items({

            ID: Joi.string().min(15).alphanum().required(),

            quantity: Joi.string().alphanum().min(1).required()
        })
    })

    const { error } = schema.validate({ userID, clientID, products })

    if (error) return res.status(400).json({ error: error.message.replace(/"+/g, '') })

    return next()
}