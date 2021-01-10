import BodyValidation from '../../utils/bodyValidation/admin/login'
import AdminRepository from '../../database/repositories/AdminRepository'
import Bcrypt from '../../utils/bcrypt'
import Jwt from '../../utils/jwt'

export default async (req, res) => {
  const { login, password } = req.body

  try {
    const validateBodyErrorMessage = await BodyValidation({ login, password })

    if (validateBodyErrorMessage) return res.status(400).json(validateBodyErrorMessage)

    const admin = await AdminRepository.getAdmin({ queryParams: { login }, getPassword: true })

    if (admin.accountNotFound) return res.status(400).json({ error: 'This account does not exists' })

    const resultComparePassword = await Bcrypt.compare(password, admin.account.password)

    if (resultComparePassword.incorrectPassword) return res.status(400).json({ error: 'Incorrect credentials, try again.' })

    const token = Jwt.generateToken({ id: admin.account.id })

    return res.status(200).json({ accountId: admin.account.id, token: `Bearer ${token}` })
  } catch (e) {
    return res.status(500).json({ error: 'An error occurred while logging in' })
  }
}
