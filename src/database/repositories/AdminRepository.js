import Admin from '../models/Admin'

class AdminRepository {

  static async setAdmin (admin) {
    try {
      await Admin.create(admin)

      return { status: 200, message: 'Success to create admin account' }
    } catch (e) {
      throw new Error('Error while creating admin')
    }
  }
}

export default AdminRepository
