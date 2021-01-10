import AdminRepository from '../database/repositories/AdminRepository'
import UserRepository from '../database/repositories/UserRepository'
exports.client = async (req, res, next) => {

  const user = req.body.USER

  try {

    if (user.hierarchy == 'admin') return next()

    if (user.allPermissions) return next()

    const permissions = [
      { POST: user.createProducts },
      { GET: user.readClients },
      { PUT: user.updateClients },
      { DELETE: user.deleteClients }
    ]

    req.body.USER = undefined

    permissions.forEach((permission) => {

      if (Object.keys(permission)[0] == req.method) {

        if (!Object.values(permission)[0]) return res.status(401).json({ error: 'You are not authorized to access this route' })
      }
    })

    return next()

  } catch (error) {

    return res.status(500).json({ error: 'There was an error validating your access' })
  }
}

exports.product = async (req, res, next) => {

  const user = req.body.USER

  try {

    if (user.hierarchy == 'admin') return next()

    if (req.method == 'DELETE' && user.hierarchy == 'user') return res.status(401).json({ error: 'You are not allowed to access this route, only administrators' })

    if (user.allPermissions) return next()

    const permissions = [
      { POST: user.createProducts },
      { GET: user.readProducts },
      { PUT: user.updateProducts },
    ]

    req.body.USER = undefined

    permissions.forEach((permission) => {

      if (Object.keys(permission)[0] == req.method) {

        if (!Object.values(permission)[0]) return res.status(401).json({ error: 'You are not authorized to access this route' })
      }
    })

    return next()

  } catch (error) {

    return res.status(500).json({ error: 'There was an error validating your access' })
  }
}

exports.receipt = async (req, res, next) => {

  const user = req.body.USER

  try {

    if (user.hierarchy == 'admin') return next()

    if (user.allPermissions) return next()

    const permissions = [
      { POST: user.createReceipts },
      { GET: user.readReceipts },
    ]

    req.body.USER = undefined

    permissions.forEach((permission) => {

      if (Object.keys(permission)[0] == req.method) {

        if (!Object.values(permission)[0]) return res.status(401).json({ error: 'You are not authorized to access this route' })
      }
    })

    return next()

  } catch (error) {

    return res.status(500).json({ error: 'There was an error validating your access' })
  }
}

exports.user = async (req, res, next) => {

  const user = req.body.USER

  try {

    if (user.hierarchy !== 'admin') return res.status(401).json({ error: "You are not allowed to access this route, only administrators" })

    return next()

  } catch (error) {

    res.status(500).json({ error: 'There was an internal error when validating your access' })
  }
}

exports.admin = async (req, res, next) => {

  const user = req.loggedAccount

  try {


    return next()

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'There was an internal error when validating your access' })
  }
}

exports.storage = async (req, res, next) => {

  const user = req.body.USER

  try {

    if (user.hierarchy !== 'admin') return res.status(401).json({ error: "You are not allowed to access this route, only administrators" })


    return next()

  } catch (error) {

    res.status(500).json({ error: 'There was an internal error when validating your access' })
  }
}

async function getLoggedAccount(requestData) {
  const _id = requestData.accountId

  const [userAccount, adminAccount] = await Promise.all([
    UserRepository.getUser({ queryParams: { _id } }),
    AdminRepository.getAdmin({ queryParams: { _id } })
  ])
  
  if (userAccount.accountNotFound && adminAccount.accountNotFound) throw new Error('Error while get admin and user account')

  const loggedAccount = userAccount.accountNotFound ? adminAccount.account[0] : userAccount.account[0]

  return loggedAccount
}

export default class {

  static async adminAcess(req, res, next) {
    try {
      const loggedAccount = await getLoggedAccount(req)
      console.log(loggedAccount, loggedAccount.hierarchy !== 'admin')
      if (loggedAccount.hierarchy !== 'admin') return res.status(401).json({ error: "You are not allowed to access this route, only administrators" })

      return next()
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Error while trying grant permission to access' })
    }
  }
}
