import Admin from '../models/Admin'

class AdminRepository {

  static async setAdmin (admin) {
    try {
      const adminAccountExists = await this.getAdmin({ login: admin.login })

      if (adminAccountExists.length === 1) return { adminAlreadyExists: true }

      await Admin.create(admin)

      return { adminAlreadyExists: false , message: 'Success to create admin account' }
    } catch (e) {
      throw new Error('Error while creating admin')
    }
  }

  static async getAdmin (searchParams) {
    try {
      return await Admin.find(searchParams || null)
    } catch (error) {
      throw new Error('Error while get admin')     
    }
  }
}

export default AdminRepository
