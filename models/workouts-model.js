const db = require('../config/db-config.js');

module.exports = {
    addExercise,
    findById,
    findAll
};

function addExercise(workoutData, workout_id) {
    
    const exercise = db('exercises')
            .where({name: workoutData.name});

    return db('workouts-exercises')
            .insert({
                reps: workoutData.reps || '',
                sets: workoutData.sets || '',
                workout_id: workout_id,
                exercise_id: exercise.id
             })
};

function findById(id){
    return db('workouts')
            .where({ id })
            .first()
};

function findAll(){
    return db('workouts')
}

