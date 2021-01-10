import Admin from '../models/Admin'

class AdminRepository {

  static async setAdmin (admin) {
    try {
      const adminRequested = await this.getAdmin({ queryParams: { login: admin.login } })

      if (!adminRequested.accountNotFound) return { adminAlreadyExists: true }

      await Admin.create(admin)

      return { adminAlreadyExists: false , message: 'Success to create admin account' }
    } catch (e) {
      throw new Error('Error while creating admin')
    }
  }

  static async getAdmin (searchParams = { queryParams: null, getPassword: null }) {
    try {
      let account =  searchParams.getPassword ? await Admin.find(searchParams.queryParams || null).select('+password') : await Admin.find(searchParams.queryParams || null)

      if (account.length < 1) return { accountNotFound: true }

      account = account[0]

      account = {
        id: account._id,
        name: account.name,
        login: account.login,
        password: searchParams.getPassword ? account.password : null,
        deleteAdmin: account.deleteAdmin
      }

      return { accountNotFound: false, account }
    } catch (e) {
      throw new Error('Error while get admin')     
    }
  }
}

export default AdminRepository
