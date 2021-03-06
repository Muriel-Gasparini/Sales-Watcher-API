import User from '../models/User'

export default class {

  static async getUser(searchParams = { queryParams: null, getPassword: null }) {
    try {
      const searchedAccounts = searchParams.getPassword ? await User.find(searchParams.queryParams || null).select('+password') : await User.find(searchParams.queryParams || null)

      if (searchedAccounts.length < 1) return { accountNotFound: true }

      const account = searchedAccounts.map(account => {
        const { _id, __v, password, ...accountWithoutIdAndPassword } = account._doc

        return Object.assign(
          { id: _id, password: searchParams.getPassword ? password : null },
          accountWithoutIdAndPassword
        )
      })
      return { accountNotFound: false, account }
    } catch (e) {
      throw new Error('Error while get user')
    }
  }
}
