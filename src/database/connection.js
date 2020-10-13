const mongoose = require('mongoose')

require('dotenv').config()

mongoose.connect(`mongodb+srv://muriel:${process.env.DB_PASS}@cluster0.tmjxh.gcp.mongodb.net/api?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })

    .then(console.log('Connection Established/Database 👻'))
    .catch( error => console.log(`An error has occurred, see 👉 ${error}`) )

module.exports = mongoose