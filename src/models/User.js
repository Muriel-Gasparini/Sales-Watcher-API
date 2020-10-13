const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        select: false,
        required: true
    },
    allPermissions: {
        type: Boolean,
        default: false
    },
    createClients: {
        type: Boolean,
        default: false
    },
    readClients: {
        type: Boolean,
        default: false
    },
    updateClients: {
        type: Boolean,
        default: false
    },
    deleteClients: {
        type: Boolean,
        default: false
    },
    createProducts: {
        type: Boolean,
        default: false
    },
    readProducts: {
        type: Boolean,
        default: false
    },
    updateProducts: {
        type: Boolean,
        default: false
    },
    createReceipts: {
        type: Boolean,
        default: false
    },
    readReceipts: {
        type: Boolean,
        default: false
    },
    hierarchy: {
        type: String,
        default: 'user'
    }
})

User.pre('save', async function(next) {

    this.password = await bcryptjs.hash(this.password, 10)

    return next()
})

module.exports = mongoose.model('User', User)