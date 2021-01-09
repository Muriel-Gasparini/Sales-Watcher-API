import AdminRepository from '../../database/repositories/AdminRepository'
import BodyValidation from '../../middlewares/bodyValidation/create-admin-account'

export default async (req, res) => {
  const { name, login, password, deleteAdmin } = req.body

  try {
    const account = {
      name,
      login,
      password,
      deleteAdmin
    }

    const invalidBodyErrorMessage = await BodyValidation(account)

    if (invalidBodyErrorMessage) return res.status(404).json(invalidBodyErrorMessage)
    
    await AdminRepository.setAdmin(account)

    res.status(200).json({ message: 'Success on creating admin' })
  } catch (e) {
    res.status(404).json({ error: 'Error on creating admin' })
  }
}