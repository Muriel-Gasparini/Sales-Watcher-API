import AdminRepository from '../../database/repositories/AdminRepository'

export default class {

  static async getAdmin (req, res) {
    const { id } = req.params
    try {
      const admin = !id ? await AdminRepository.getAdmin() : await AdminRepository.getAdmin({ queryParams: { _id: id } })
  
      if (admin.accountNotFound) return res.status(400).json({ error: 'There are no admins with this ID' })
  
      return res.status(200).json(admin.account)
    } catch (error) {
      return res.status(400).json({ error: 'An error occurred while listing admins, make sure the ID is correct.' })
    }
  }
}
