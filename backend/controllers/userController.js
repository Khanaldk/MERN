const User = require('../models/userModel')

const userControllers = {}

userControllers.createUser = async (req, res) => {
    const newuser = {
        name: req.body.name,
        email: req.body.email
    }
    const userCreate = await User.create(newuser);
    if (userCreate) {
        return res.status(201).json({
            message: 'User created successfully.', data: newuser
        });
    }
}
module.exports = userControllers