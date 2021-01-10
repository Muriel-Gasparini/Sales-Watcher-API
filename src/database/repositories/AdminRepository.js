import Admin from '../models/Admin'

class AdminRepository {

  static async setAdmin(account) {
    try {
      const adminRequested = await this.getAdmin({ queryParams: { login: account.login } })

      if (!adminRequested.accountNotFound) return { adminAlreadyExists: true, message: 'This account already exists' }

      const admin = await Admin.create(account)

      const { _id, __v, password, ...accountWithoutIdAndPassword } = admin._doc

      return { 
        adminAlreadyExists: false,
        account: Object.assign(
        { id: _id, password: null},
        accountWithoutIdAndPassword
      )}
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

  static async deleteAdminById(_id) {
    try {
      const responseToDelete = await Admin.deleteOne({ _id })

      if (responseToDelete.deletedCount < 1) return { IsAlreadyDeleted: true }
      
      return { IsAlreadyDeleted: false }
    } catch (e) {
      throw new Error('An error ocurred while trying delete admin')
    }
  }
}

export default AdminRepository
