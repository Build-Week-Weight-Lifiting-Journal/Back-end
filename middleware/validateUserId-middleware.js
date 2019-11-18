const Users = require("../models/users-model");

module.exports = (req, res, next) => {
    Users.getById(req.params.id)
    .then(user => {
        if (user) {
            req.user = user;
            next();
        } else {
            res.status(400).json({ message: "A user was not found with that ID." });
        }
    })
    .catch(err => {
        res.status(500).json({ error: "The server encountered an error while retrieving that user." });
    })
};