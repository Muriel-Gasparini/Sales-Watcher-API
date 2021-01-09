import AdminRepository from '../../database/repositories/AdminRepository'
import bodyValidation from '../../middlewares/bodyValidation/create-admin-account'
import env from '../../config/envs'

export default async (req, res) => {
  try {
    const { name, login, password, deleteAdmin, secret } = req.body
    
    const account = {
      name,
      login,
      password,
      deleteAdmin,
      secret
    }

    const invalidBodyErrorMessage = await bodyValidation(account)

    if (invalidBodyErrorMessage) return res.status(400).json(invalidBodyErrorMessage)

    if (secret !== env.createAdminPassword) return res.status(400).json({ error: 'The provided password is invalid' })

    const result = await AdminRepository.setAdmin(account)

    if (result.adminAlreadyExists) return res.status(400).json({ error: 'This admin login already exists' })

    res.status(201).json({ message: 'Success on creating admin' })
  } catch (e) {
    res.status(500).json({ error: 'Error on creating admin' })
  }
}