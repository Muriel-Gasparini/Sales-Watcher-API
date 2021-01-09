const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')

const Admin = require('../database/models/Admin')
const User = require('../database/models/User')

require('dotenv').config()

function generateToken(id = {}) {

    return jwt.sign(id, process.env.SECRET, { expiresIn: '5h' })
}

exports.admin = async (req, res) => {

    const { login, password } = req.body

    try {

        const admin = await Admin.findOne({ login: login }).select('+password')

        if (admin == null) return res.status(401).json({ error: 'Incorrect credentials, try again.' })

        if (!await bcryptjs.compare(password, admin.password)) return res.status(401).json({ error: 'Incorrect credentials, try again.' })

        const token = generateToken({ id: admin._id })

        return res.status(200).json({ userID: admin._id, token: `Bearer ${token}` })

    } catch (error) {
      
        return res.status(500).json({ error: 'An error occurred while logging in' })
    }
}

exports.user = async (req, res) => {

    const { login, password } = req.body

    try {

        const user = await User.findOne({ login: login }).select('+password')

        if (user == null) return res.status(401).json({ error: 'Incorrect credentials, try again.' })

        if (!await bcryptjs.compare(password, user.password)) return res.status(401).json({ error: 'Incorrect credentials, try again.' })

        const token = generateToken({ id: user._id })

        return res.status(200).json({ userID: user._id, token: `Bearer ${token}` })

    } catch (error) {
        
        return res.status(500).json({ error: 'An error occurred while logging in' })
    }
}
