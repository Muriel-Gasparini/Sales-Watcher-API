import UserRepository from '../../database/repositories/UserRepository'
import AdminRepository from '../../database/repositories/AdminRepository'

export default async (req) => {
  const _id = req.accountId

  const [userAccount, adminAccount] = await Promise.all([
    UserRepository.getUser({ queryParams: { _id } }),
    AdminRepository.getAdmin({ queryParams: { _id } })
  ])
  
  if (userAccount.accountNotFound && adminAccount.accountNotFound) throw new Error('Error while get admin and user account')

  const loggedAccount = userAccount.accountNotFound ? adminAccount.account[0] : userAccount.account[0]

  return loggedAccount
}
