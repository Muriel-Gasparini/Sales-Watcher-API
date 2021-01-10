import User from '../models/User'

export default class {

  static async getUser(searchParams = { queryParams: null, getPassword: null }) {
    try {
      let account = searchParams.getPassword ? await User.find(searchParams.queryParams || null).select('+password') : await User.find(searchParams.queryParams)

      if (account.length < 1) return { accountNotFound: true }

      let { _id, __v, ...accountWithoutPassword } = account[0]._doc

      account = Object.assign({ id: _id }, accountWithoutPassword)
      
      return { accountNotFound: false, account }
    } catch (e) {
      throw new Error('Error while user login')
    }
  }
}
