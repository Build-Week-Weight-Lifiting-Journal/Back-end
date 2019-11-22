const Workouts = require("../models/workouts-model");

// Verifies that the workout ID provided exists within the database
module.exports = (req, res, next) => {
    Workouts.findById(req.params.id)
    .then(workout => {
        if (workout) {
            next();
        } else {
            res.status(400).json({ message: `A workout was not found with that id: ${req.params.id}.` });
        }
    })
    .catch(err => {
        res.status(500).json({ error: "The server encountered an error while retrieving that workout." });
    })
};