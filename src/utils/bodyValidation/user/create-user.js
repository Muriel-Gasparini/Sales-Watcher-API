import Joi from 'joi'

export default (account) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    login: Joi.string().required(),
    password: Joi.string().required(),
    grantedAllPermissions: Joi.boolean(),
    permissionTo: {
      createClients: Joi.boolean(),
      readClients: Joi.boolean(),
      updateClients: Joi.boolean(),
      deleteClients: Joi.boolean(),
      createProducts: Joi.boolean(),
      readProducts: Joi.boolean(),
      updateProducts: Joi.boolean(),
      createReceipts: Joi.boolean(),
      readReceipts: Joi.boolean()
    }
  })
  
  const { error } = schema.validate(account)
  
  if (error) return { jsonError: error.message.replace(/"+/g, '') }

  return null
}