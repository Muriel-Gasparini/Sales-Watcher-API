import AdminRepository from '../../database/repositories/AdminRepository'
import bodyValidation from '../../middlewares/bodyValidation/create-admin-account'
import env from '../../config/envs'

export default async (req, res) => {
  const { name, login, password, deleteAdmin, secret } = req.body

  try {
    const account = {
      name,
      login,
      password,
      deleteAdmin,
      secret
    }

    const invalidBodyErrorMessage = await bodyValidation(account)

    if (invalidBodyErrorMessage) return res.status(404).json(invalidBodyErrorMessage)

    if (secret !== env.createAdminPassword) return res.status(404).json({ error: 'The provided password is invalid' })

    await AdminRepository.setAdmin(account)

    res.status(200).json({ message: 'Success on creating admin' })
  } catch (e) {
    res.status(404).json({ error: 'Error on creating admin' })
  }
}