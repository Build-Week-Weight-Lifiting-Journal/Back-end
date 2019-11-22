const Exercises = require("../models/workouts_exercises-model");

// Verifies that the exercise ID provided exists within the database
module.exports = (req, res, next) => {
    Exercises.getById(req.params.id)
    .then(exercise => {
        if (exercise) {
            next();
        } else {
            res.status(400).json({ message: `A exercise was not found with that id: ${req.params.id}.` });
        }
    })
    .catch(err => {
        res.status(500).json({ error: "The server encountered an error while retrieving that exercise." });
    })
};