const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')

const Admin = new mongoose.Schema({
    name: {
        type: String,
        default: 'Root',
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
    deleteAdmin: {
        type: Boolean,
        selected: false,
        required: true
    },
    hierarchy: {
        type: String,
        default: 'admin'
    }
})

Admin.pre('save', async function(next) {

    this.password = await bcryptjs.hash(this.password, 10)

    return next()
})

module.exports = mongoose.model('Admins', Admin)