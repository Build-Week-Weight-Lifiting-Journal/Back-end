const db = require('../config/db-config.js');

module.exports = {
    addExercise,
    findById,
    findAll,
    findUserWorkouts,
};

async function addExercise(workoutData, workout_id) {
    
    const exercise = await db('exercises')
            .where({name: workoutData.name})
            .first();

    return await db('workouts_exercises')
            .insert({
                reps: workoutData.reps || '',
                sets: workoutData.sets || '',
                workout_id: workout_id,
                exercise_id: exercise.id
             })
};

function findById(workout_id){
    return db('workouts_exercises as we')
        .join("workouts as w", "we.workout_id", "w.id")
        .join("users as u", "w.user_id", "u.id")
        .join("exercises as e", 'we.exercise_id', 'e.id')
        .select(
            'w.id as workout_id', 
            'w.name as workout_name', 
            'e.name as exercise_name',
            'e.region',
            'we.reps',
            'we.sets'
            )
        .where({ workout_id })
};

function findAll(){
    return db('workouts')
};

function findUserWorkouts(user_id) {
    return db('workouts as w')
        .join('workouts_exercises as we', 'we.workout_id', 'w.id')
        .join('users as u', 'w.user_id', 'u.id')
        .join('exercises as e', 'we.exercise_id', 'e.id')
        .groupBy('w.name')
        .select(
            'w.id',
            'w.name as workout_name',
            'u.username',
            'u.id as user_id'
            )
        .count('e.id as exercises')
        .where({ user_id });
};
