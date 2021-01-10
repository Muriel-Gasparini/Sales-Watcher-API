import { sign } from 'jsonwebtoken'

export default class {

  static generateToken (payload) {
    return sign(payload, process.env.SECRET, { expiresIn: '8h' })
  }
}