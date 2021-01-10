import Jwt from '../utils/jwt'

export default async (req, res, next) => {
  try {
    const headerToken = req.headers.authorization

    if (!headerToken) return res.status(401).json({ error: 'No token provided' })

    const [bearer, token] = headerToken.split(' ')

    if (!/Bearer/.test(bearer)) return res.status(401).json({ error: 'Unauthorized token incorrectly formatted' })

    const { isValidToken, payload, errorMessage } = await Jwt.isValidToken(token)

    if (!isValidToken) return res.status(401).json({ error: errorMessage })

    req.accountId = payload.accountId

    next()
  } catch (error) {
    return res.status(500).json({ error: 'There was an error validating your token' })
  }
}