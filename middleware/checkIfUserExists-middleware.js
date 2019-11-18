const Users = require("../models/users-model");

module.exports = (req, res, next) => {
    Users.getByUsername(req.body.username)
    .then(user => {
        if (!user) {
            next();
        } else {
            res.status(400).json({ message: "That username is already taken." })
        }
    })
    .catch(err => res.status(500).json({ message: "oops"}))
}