const router = require('express').Router();

const Workouts = require('../models/workouts-model');
const validateExercise = require("../middleware/validateExercise");
const validateWorkoutId = require("../middleware/validateWorkoutId-middleware");

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
        if (workout) {
            res.status(200).json(workout)
        } else {
            res.status(404).json({ message: `The workout with id: ${id} does not exist.` })
        }
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
                res.status(500).json({ error: "The server failed to add the exercise to the workout"})
            });
    } else {
        res.status(400).json({ 
            message: "Invalid exercise information. Please see errors for details.",
            errors: validationResult.errors 
        })
    }

});

// DELETE - delete a workout by ID
router.delete('/:id', validateWorkoutId, (req, res) => {
    const { id } = req.params;

    Workouts.remove(id)
            .then(workout => {
                res.status(200).json({message: 'The selected workout was removed'})
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: 'the workout could not be removed'})
            })
});

// PUT - edit a workout by ID
router.put('/:id', validateWorkoutId, (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Workouts.edit(changes, id)
            .then(workout => {
                res.status(200).json(workout)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: 'the server could not edit the workout'})
            })
});


module.exports = router;