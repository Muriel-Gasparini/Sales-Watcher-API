const express = require('express')
const helmet = require('helmet')

const app = express()

require('./database/connection')

app.use(helmet())

app.use(express.json())

require('./routes/router')(app)
require('./routes/no-auth')(app)

require('dotenv').config()

const PORT = process.env.PORT

app.listen(PORT, console.log(`Server ON ${PORT} 🚀`))