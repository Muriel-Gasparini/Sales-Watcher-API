import AdminRepository from '../../database/repositories/AdminRepository'
import BodyValidation from '../../utils/bodyValidation/admin/create-account'

export default class {

  static async getAdmin(req, res) {
    const { id } = req.params
    try {
      const admin = !id ? await AdminRepository.getAdmin() : await AdminRepository.getAdmin({ queryParams: { _id: id } })

      if (admin.accountNotFound) return res.status(400).json({ error: 'There are no admins with this ID' })

      return res.status(200).json(admin.account)
    } catch (error) {
      return res.status(400).json({ error: 'An error occurred while listing admins, make sure the ID is correct.' })
    }
  }

  static async postAdmin(req, res) {
    try {
      const { name, login, password } = req.body

      const { isValidBody, jsonError } = await BodyValidation({ name, login, password, deleteAdmin: false }, true)

      if (!isValidBody) return res.status(400).json({ jsonError })

      const resultToCreate = await AdminRepository.setAdmin({ name, login, password })

      if (resultToCreate.adminAlreadyExists) return res.status(400).json({ error: resultToCreate.message })

      res.status(201).json({ message: 'The administrator was created successfully' })
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'An error occurred while creating the administrator' })
    }
  }
}
