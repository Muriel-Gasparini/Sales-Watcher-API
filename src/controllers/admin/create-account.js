import AdminRepository from '../../database/repositories/AdminRepository'
import bodyValidation from '../../utils/bodyValidation/admin/create-account'
import env from '../../config/envs'

export default async (req, res) => {
  try {
    const { isValidBody, jsonError } = await bodyValidation(req.body, true)

    if (!isValidBody) return res.status(400).json({ jsonError })

    if (req.body.secret !== env.createAdminPassword) return res.status(400).json({ error: 'The provided password is invalid' })

    const { adminAlreadyExists, account, message } = await AdminRepository.setAdmin(req.body)

    if (adminAlreadyExists) return res.status(400).json({ error: message })

    res.status(201).json(account)
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: 'Error on creating admin' })
  }
}