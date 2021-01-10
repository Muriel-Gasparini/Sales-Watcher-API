import { sign, verify } from 'jsonwebtoken'
import envs from '../../config/envs'

export default class {

  static generateToken(payload) {
    const token = sign(payload, process.env.SECRET, { expiresIn: '8h' })
    return `Bearer ${token}`
  }

  static async isValidToken(token) {
    try {
      const resultToDecodeJwt = await verify(token, envs.jwtSecret, (error, payload) => {
        const errors = [
          { testToError: /'expired/.test(error), errorMessage: 'This jwt is expired' },
          { testToError: error, errorMessage: 'This jwt is invalid' }
        ]
        for (const x in errors) {
          if (errors[x].testToError) return { isValidToken: false, errorMessage: errors[x].errorMessage }
        }
        return { isValidToken: true, payload: payload }
      })
      return resultToDecodeJwt
    } catch (e) {
      throw new Error('An error ocurred while trying decode JWT')
    }
  }
}