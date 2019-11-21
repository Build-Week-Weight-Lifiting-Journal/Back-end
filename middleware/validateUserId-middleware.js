const Users = require("../models/users-model");

// Verifies that the user ID provided exists within the database
module.exports = (req, res, next) => {
    Users.getById(req.params.id)
    .then(user => {
        if (user) {
            req.userId = user;
            next();
        } else {
            res.status(400).json({ message: `A user was not found with that id: ${req.params.id}.` });
        }
    })
    .catch(err => {
        res.status(500).json({ error: "The server encountered an error while retrieving that user." });
    })
};