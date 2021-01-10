import Joi from 'joi'

export default (account) => {

  const schema = Joi.object({
    name: Joi.string().required(),
    login: Joi.string().required(),
    password: Joi.string().required(),
    deleteAdmin: Joi.boolean().required(),
    secret: Joi.string().required() 
  })
  
  const { error } = schema.validate(account)
  
  if (error) return { jsonError: error.message.replace(/"+/g, '') }

}
