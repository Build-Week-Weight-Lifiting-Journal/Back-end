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
});

router.put('/:workout_id/exercises/:id', (req, res) => {
    const workoutData = req.body;
    const { workout_id, id } = req.params;
    WorkoutExercises.editExercise(workoutData, workout_id, id)
        .then(exercise => {
            res.status(200).json(exercise)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "the server failed to update the exercise" })
        })
})


module.exports = router;