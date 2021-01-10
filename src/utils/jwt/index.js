import { sign } from 'jsonwebtoken'

export default class {

  static generateToken (payload) {
    const token = sign(payload, process.env.SECRET, { expiresIn: '8h' })

    return `Bearer ${token}`
  }
}