import UserRepository from '../../database/repositories/UserRepository'
import BodyValidation from '../../utils/bodyValidation/user/create-user'

export default class {

  static async postUser (req, res) {
    try {
      const { isValidBody, jsonError } = await BodyValidation(req.body)

      if (!isValidBody) return res.status(400).json({ jsonError })

      const { userAlreadyExists, account, message } = await UserRepository.setUser(req.body)

      if (userAlreadyExists) return res.status(400).json({ error: message})

      res.status(201).json(account)
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while creating the user' })
    }
  }
}
