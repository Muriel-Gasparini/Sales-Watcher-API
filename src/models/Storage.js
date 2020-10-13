const mongoose = require('mongoose')

const Storage = new mongoose.Schema({
    productID: {
        type: String,
        required: true
    },
    sellingDay: {
        type: Date
    },
    sold: {
        type: Boolean,
        default: false
    },
    cadastrator: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Storage', Storage)