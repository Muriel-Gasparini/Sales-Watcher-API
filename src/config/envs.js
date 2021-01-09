import { config } from 'dotenv'

config()

export default {
  createAdminPassword: process.env.CREATE_ADMIN_PASS || null
}
