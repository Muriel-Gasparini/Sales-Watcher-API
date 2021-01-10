import Joi from 'joi'

export default (account) => {
  const schema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().required()
  })
  
  const { error } = schema.validate(account)
  
  if (error) return { jsonError: error.message.replace(/"+/g, '') }

  return null
}
