const mongoose = require('mongoose')

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        default: "The user does not have a phone number",
        required: true
    },
    deliveryPlace: {
        type: String,
        default: "The user did not inform the delivery place",
        required: true
    },
    createdAt: {
        type: Date,
        default: (Date.now() - 3)
    },
    updatedAt: {
        type: Date,
        default: (Date.now() - 3)
    }
})

module.exports = mongoose.model('Clients', User)