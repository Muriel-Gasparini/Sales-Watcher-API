const mongoose = require('mongoose')

const Receipt = mongoose.Schema({
    clientID: {
        type: String,
        required: true
    },
    clientName: {
        type: String,
        required: true
    },
    products: {
        type: Array,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
})

module.exports = mongoose.model('Receipts', Receipt)