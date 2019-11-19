const router = require('express').Router();

const Workouts = require('../models/workouts-model');
const validateExercise = require("../middleware/validateExercise");

// GET - all workouts
router.get('/', (req, res) => {
    Workouts.findAll()
        .then(workouts => {
            res.status(200).json(workouts)
        })
        .catch(err => {
            res.status(500).json({ error: 'the server failed to retrieve all workouts'})
        })
})

// GET - individual workout by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    Workouts.findById(id)
    .then(workout => {
        res.status(200).json(workout)
    })
    .catch(err => {
        res.status(500).json({ error: "The server failed to retrieve the workout by id"})
    })
})

// POST - add an exercise to a workout
router.post('/:id/exercises', (req, res) => {
    const workoutData = req.body;
    const { id } = req.params;

    const validationResult = validateExercise(workoutData);

    if (validationResult.isSuccessful) {
        Workouts.addExercise(workoutData, id)
            .then(workout => {
                res.status(201).json(workout);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: "The server failed to add the exercise to the workout"})
            });
    } else {
        res.status(400).json({ 
            message: "Invalid exercise information. Please see errors for details.",
            errors: validationResult.errors 
        })
    }

});


module.exports = router;