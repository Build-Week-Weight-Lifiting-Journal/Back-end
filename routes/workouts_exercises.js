const router = require('express').Router();

const WorkoutExercises = require('../models/workouts_exercises-model');

// GET - all exercises related to workouts
router.get('/', (req, res) => {
    WorkoutExercises.get()
        .then(workouts => {
            res.status(200).json(workouts)
        })
        .catch(err => {
            res.status(500).json({ error: 'the server failed to retrieve all workouts'})
        })
})


module.exports = router;