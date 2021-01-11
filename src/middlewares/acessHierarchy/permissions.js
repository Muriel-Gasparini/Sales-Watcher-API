import GetLoggedAccount from '../../utils/getActualLoggedAccount'

export default class {

  static async onlyAdminAccounts(req, res, next) {
    try {
      const loggedAccount = await GetLoggedAccount(req)

      if (loggedAccount.hierarchy !== 'admin') return res.status(401).json({ error: "You are not allowed to access this route, only administrators" })

      return next()
    } catch (error) {
      res.status(500).json({ error: 'Error while trying grant permission to access' })
    }
  }
}
