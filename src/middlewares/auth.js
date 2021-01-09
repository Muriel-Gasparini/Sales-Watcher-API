const jwt = require('jsonwebtoken')

const User = require('../database/models/User')
const Admin = require('../database/models/Admin')

require('dotenv').config()

module.exports = async (req, res, next) => {

    const token  = req.headers.authorization

    try {
        
        if(/\/login/.test(req.path)) return next()

        if(!token) return res.status(401).json({ error: 'No token provided'})

        const tokenParts = token.split(' ')

        if(!/Bearer/.test(tokenParts[0])) return res.status(401).json({ error: 'Unauthorized token incorrectly formatted'})

        const _id = await jwt.verify(tokenParts[1], process.env.SECRET,(err, decoded) => {
            
            if(err) return res.status(401).json({ error: 'The provided token is invalid'})

            return decoded.id
        })

        
        const userFind = await User.findById({ _id })

        const adminFind = await Admin.findById({ _id })

        const user = userFind == null ? adminFind : userFind

        req.body.USER = user

        next()

    } catch (error) {

        return res.status(500).json({ error: 'There was an error validating your token'})
    }
}