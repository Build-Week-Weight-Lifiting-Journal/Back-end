const Users = require("../models/users-model");

module.exports = async (req, res, next) => {
    try {
        const user = await Users.findByUsername(req.body.username);
        const email = await Users.findByEmail(req.body.email);
        
        if (!user && !email) {
            next();
        } else if (email) {
            res.status(400).json({ message: "That email is already taken." })
        } else if (user) {
            res.status(400).json({ message: "That username is already taken." })
        }
    } catch (err) {
        res.status(500).json({ message: "The server encountered an issue while registering. Please try again later." })
    }
}