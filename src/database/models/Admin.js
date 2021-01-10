import { Schema, model } from 'mongoose'
import { hash } from 'bcryptjs'

const Admin = new Schema({
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
        required: true
    },
    hierarchy: {
        type: String,
        default: 'admin'
    }
})

Admin.pre('save', async function(next) {

    this.password = await hash(this.password, 10)

    return next()
})

export default model('Admins', Admin)