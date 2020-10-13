const Client = require('../models/Client')

exports.create = async (req, res) => {

    const { name, email, phoneNumber, deliveryPlace } = req.body

    try {

        await Client.create({
            name,
            email,
            phoneNumber,
            deliveryPlace
        })

        res.status(201).json({ message: 'You have successfully registered your client' })

    } catch (error) {

        return res.status(400).json({ error: 'Make sure you have sent all required data' })
    }
}

exports.delete = async (req, res) => {

    const { id } = req.params

    try {

        if (!id) return res.status(400).json({ error: 'Please inform the client ID' })

        const client = await Client.deleteOne({ _id: id })

        if (client.deletedCount == 0) return res.status(400).json({ error: 'There are no clients with this ID'})

        return res.status(200).json({ message: 'Client successfully deleted' })

    } catch (error) {
       
        return res.status(400).json({ error: 'There was an error deleting the client, make sure the ID is correct.' })
    }
}

exports.edit = async (req, res) => {

    const { name, email, phoneNumber, deliveryPlace } = req.body

    const { id } = req.params

    try {

        if (!id) return res.status(400).json({ error: 'Please inform the client ID' })

        const client = await Client.findOne({ _id: id })

        if (client == null) return res.status(400).json({ error: 'There are no customers with this ID'})

        client.name = name || client.name
        client.email = email || client.email
        client.phoneNumber = phoneNumber || client.phoneNumber
        client.deliveryPlace = deliveryPlace || client.deliveryPlace
        client.updatedAt = Date.now()

        await client.save()

        return res.status(200).json({ message: 'The client has been successfully updated' })

    } catch (error) {

        return res.status(500).json({ error: 'An error occurred while editing customer data' })
    }
}

exports.list = async (req, res) => {

    const { id } = req.params

    try {

        const client = !id ? await Client.find() : await Client.findOne({ _id: id })

        if (client.length < 1) return res.status(200).json({ message: 'No registered customers'})
        
        return res.status(200).json({ client })

    } catch (error) {

        return res.status(400).json({ error: 'An error occurred while listing customers, make sure the ID is correct.' })
    }
}
