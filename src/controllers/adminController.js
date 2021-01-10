const Admin = require('../database/models/Admin')

exports.delete = async (req, res) => {

  const { adminID } = req.body
  const { id } = req.params

  try {

    const admin = await Admin.findById({ _id: adminID })

    if (!admin.deleteAdmin) return res.status(401).json({ error: 'You have not been authorized to delete administrators' })

    await Admin.findByIdAndDelete({ _id: id })

    res.status(200).json({ message: 'The administrator was successfully deleted' })

  } catch (error) {

    res.status(500).json({ error: 'An error occurred while deleting the administrator' })
  }
}
