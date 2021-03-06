import BodyValidation from '../../utils/bodyValidation/login'
import AdminRepository from '../../database/repositories/AdminRepository'
import Bcrypt from '../../utils/bcrypt'
import Jwt from '../../utils/jwt'

export default async (req, res) => {
  try {
    const { login, password } = req.body

    const validateBodyErrorMessage = await BodyValidation({ login, password })

    if (validateBodyErrorMessage) return res.status(400).json(validateBodyErrorMessage)

    const admin = await AdminRepository.getAdmin({ queryParams: { login }, getPassword: true })

    if (admin.accountNotFound) return res.status(400).json({ error: 'This account does not exists' })

    const resultComparePassword = await Bcrypt.compare(password, admin.account[0].password)

    if (resultComparePassword.incorrectPassword) return res.status(400).json({ error: 'Incorrect credentials, try again.' })

    const token = Jwt.generateToken({ accountId: admin.account[0].id })
    
    return res.status(200).json({ accountId: admin.account[0].id, token })
  } catch (e) {
    return res.status(500).json({ error: 'An error occurred while logging in' })
  }
}
