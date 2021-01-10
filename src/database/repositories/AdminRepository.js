import Admin from '../models/Admin'

class AdminRepository {

  static async setAdmin(account) {
    try {
      const adminRequested = await this.getAdmin({ queryParams: { login: account.login } })

      if (!adminRequested.accountNotFound) return { adminAlreadyExists: true, message: 'This account already exists' }

      await Admin.create(account)

      return { adminAlreadyExists: false, message: 'Success to create admin account' }
    } catch (e) {
      console.log(e)
      throw new Error('Error while creating admin')
    }
  }

  static async getAdmin(searchParams = { queryParams: null, getPassword: null }) {
    try {
      const searchedAccounts = searchParams.getPassword ? await Admin.find(searchParams.queryParams || null).select('+password') : await Admin.find(searchParams.queryParams || null)

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
      throw new Error('Error while get admin')
    }
  }
}

export default AdminRepository
