import Joi from 'joi'

export default (account, containSecret) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    login: Joi.string().required(),
    password: Joi.string().required(),
    deleteAdmin: Joi.boolean().required(),
    secret: containSecret ? Joi.string().required() : null

  })

  const { error } = schema.validate(account)

  if (error) return { jsonError: error.message.replace(/"+/g, ''), isValidBody: false }

  return { isValidBody: true }
}
