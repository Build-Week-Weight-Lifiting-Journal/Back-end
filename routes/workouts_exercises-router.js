const router = require('express').Router();

const WorkoutExercises = require('../models/workouts_exercises-model');

// PUT - edit an exercise that belongs to a workout
router.put('/:workout_id/exercises/:id', (req, res) => {
    const workoutData = req.body;
    const { workout_id, id } = req.params;
    WorkoutExercises.editExercise(workoutData, workout_id, id)
        .then(exercise => {
            res.status(201).json(exercise)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "the server failed to update the exercise" })
        })
});

// DELETE - delete an exercise from a workout
router.delete('/exercises/:id', (req, res) => {
    const { id } = req.params;
    WorkoutExercises.remove(id)
        .then(exercise => {
            res.status(200).json({message: 'The exercise was successfully removed from the workout.'})
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "The server failed to remove the exercise from the workout" })
        })
})

module.exports = router;