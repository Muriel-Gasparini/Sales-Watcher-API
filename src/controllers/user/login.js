import UserRepository from '../../database/repositories/UserRepository'
import Bcrypt from '../../utils/bcrypt'
import Jwt from '../../utils/jwt'
import BodyValidation from '../../utils/bodyValidation/login'

export default async (req, res) => {
  try {
    const { login, password } = req.body

    const invalidBodyErrorMessage = await BodyValidation({ login, password })

    if (invalidBodyErrorMessage) return res.status(400).json(invalidBodyErrorMessage)

    const user = await UserRepository.getUser({ queryParams: { login }, getPassword: true })

    if (user.accountNotFound) return res.status(400).json({ error: 'This account does not exists' })

    const match = await Bcrypt.compare(password, user.account.password)

    if (!match) return res.status(400).json({ error: 'Invalid Credentials' })

    const token = Jwt.generateToken({ id: user.account.id })

    res.status(200).json({ accountId: user.account.id, token })
  } catch (error) {
    res.status(500).json({ error: 'An error ocurred while trying login' })
  }
}
