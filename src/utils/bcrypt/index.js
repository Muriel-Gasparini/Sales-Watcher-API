import { compare } from 'bcryptjs'

export default class {

  static async compare (password, hashPassword) {
    try {
      const match = await compare(password, hashPassword)
      
      if (!match) return { incorrectPassword: true }
  
      return { incorrectPassword: false }
    } catch (e) {
      throw new Error('An error ocurred while trying decrypt password')
    }
  }
}
