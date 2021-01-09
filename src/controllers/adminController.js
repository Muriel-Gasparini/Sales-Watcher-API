const Admin = require('../database/models/Admin')

exports.create = async (req, res) => {

    const { name, login, password } = req.body

    try {

        await Admin.create({
            name,
            login,
            password,
            deleteAdmin: false
        })

        res.status(201).json({ message: 'The administrator was created successfully' })

    } catch (error) {

        res.status(500).json({ error: 'An error occurred while creating the administrator' })
    }
}

exports.delete = async (req, res) => {

    const { adminID } = req.body
    const { id } = req.params

    try {

        const admin = await Admin.findById({ _id: adminID })

        if (!admin.deleteAdmin) return res.status(401).json({ error: 'You have not been authorized to delete administrators'})

        await Admin.findByIdAndDelete({ _id: id})

        res.status(200).json({ message: 'The administrator was successfully deleted'})

    } catch (error) {

        res.status(500).json({ error: 'An error occurred while deleting the administrator'})
    }
}

exports.list = async (req, res) => {

    const { id } = req.params

    try {
        
        const admin = !id ? await Admin.find() : await Admin.findById(id)

        if(admin.length < 1) return res.status(400).json({ error: 'There are no admins with this ID'})

        return res.status(200).json(admin)

    } catch (error) {

        return res.status(400).json({ error: 'An error occurred while listing admins, make sure the ID is correct.' })        
    }
}