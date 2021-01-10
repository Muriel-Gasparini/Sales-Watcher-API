import { Schema, model } from 'mongoose'
import { hash } from 'bcryptjs'

const User = new Schema({
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
  grantedAllPermissions: {
    type: Boolean,
    default: false
  },
  permissionTo: {
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
    }
  },
  hierarchy: {
    type: String,
    default: 'user'
  }
})

User.pre('save', async function (next) {

  this.password = await hash(this.password, 12)

  return next()
})

export default model('User', User)