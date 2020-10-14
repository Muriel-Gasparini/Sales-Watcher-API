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

exports.edit = async (req, res) => {

    const { id } = req.params

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
        
        const user = await User.findById(id).select('+password')

        if(user == null) return res.status(400).json({ error: 'There are no users with this ID'})

        await user.updateOne({
            name: name || user.name,
            login: login || user.login,
            password: password || user.password,
            allPermissions: allPermissions || user.allPermissions,
            createClients: createClients || user.createClients,
            readClients: readClients || user.readClients,
            updateClients: updateClients || user.updateClients,
            deleteClients: deleteClients || user.deleteClients,
            createProducts: createProducts || user.createProducts,
            readProducts: readProducts || user.readProducts,
            updateProducts: updateProducts|| user.updateProducts,
            createReceipts: createReceipts || user.createReceipts,
            readReceipts: readReceipts || user.readReceipts
        })
        
        const userModified = await User.findById(id)

        return res.status(200).json(userModified)

    } catch (error) {
       console.log(error)
        return res.status(500).json({ error: 'An error occurred while editing user data' })
    }
}