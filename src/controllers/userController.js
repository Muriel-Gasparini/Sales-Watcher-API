const User = require("../models/User")

exports.create = async (req, res) => {

    const {
        name,
        login,
        password,
        allPermissions,
        createClients,
        readClients,
        updateClients,
        deleteClients,
        createProducts,
        readProducts,
        updateProducts,
        deleteProducts,
        createReceipts,
        readReceipts
    } = req.body

    try {

        await User.create({
            name,
            login,
            password,
            allPermissions,
            createClients,
            readClients,
            updateClients,
            deleteClients,
            createProducts,
            readProducts,
            updateProducts,
            deleteProducts,
            createReceipts,
            readReceipts
        })

        return res.status(201).json({ message: 'User created' })

    } catch (error) {

        return res.status(500).json({ error: 'There was a problem creating the user'})
    }
}

exports.delete = async (req, res) => {

    const { id } = req.params

    try {

        const user = await User.findById(id)
        
        if(!user) return res.status(400).json({ error: "There are no users with this ID" })

        await User.findByIdAndDelete({ _id: id})

        return res.status(200).json({ message: 'User deleted' })
        
    } catch (error) {
        
        return res.status(500).json({ error: 'There was a problem deleting the user'})
    }
}

exports.list = async (req, res) => {

    const { id } = req.params

    try {
        
        const user = !id ? await User.find() : await User.findById(id)

        if(user.length < 1) return res.status(400).json({ error: 'There are no users with this ID'})

        return res.status(200).json(user)

    } catch (error) {

        return res.status(400).json({ error: 'An error occurred while listing users, make sure the ID is correct.' })        
    }
}