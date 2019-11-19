const db = require('../config/db-config.js');

module.exports = {
    addExercise,
    findById,
    findAll,
    findUserWorkouts,
};

// Add an exercise to a workout
async function addExercise(workoutData, workout_id) {
    
    const exercise = await db('exercises')
            .where({name: workoutData.name})
            .first();

    await db('workouts_exercises')
            .insert({
                reps: workoutData.reps || '',
                sets: workoutData.sets || '',
                workout_id: workout_id,
                exercise_id: exercise.id
             })
    
    return await findById(workout_id);
};

// Find a workout by it's ID
async function findById(workout_id){
    const workout = await db('workouts as w')
        .select(
            'w.id as workout_id', 
            'w.name as workout_name', 
            )
        .where({ workout_id })
        .first();
        console.log(workout)
    
    const exercises = await db('workouts_exercises as we')
            .join("workouts as w", "we.workout_id", "w.id")
            .join("exercises as e", "we.exercise_id", "e.id")
            .select(
                "e.id as exercise_id",
                "e.name as exercise_name",
                "we.sets",
                "we.reps"
            )
            .where({ workout_id })

    return {
        ...workout,
        exercises: exercises
    }
};

function findAll(){
    return db('workouts')
};

// Find ALL workouts associated with a user
async function findUserWorkouts(user_id) {
    const workouts = await db('workouts as w')
        .leftJoin('workouts_exercises as we', 'we.workout_id', 'w.id')
        .join('users as u', 'w.user_id', 'u.id')
        .leftJoin('exercises as e', 'we.exercise_id', 'e.id')
        .groupBy('w.name')
        .select(
            'w.id as workout_id',
            'w.name as workout_name',
            'u.id as user_id',
            'u.username',
            )
        .where({ user_id });

    const workoutList = await Promise.all(workouts.map( async workout => {
        let exercises = await db('workouts_exercises as we')
        .join("workouts as w", "we.workout_id", "w.id")
        .join("exercises as e", "we.exercise_id", "e.id")
        .select(
            "e.id as exercise_id",
            "e.name as exercise_name",
            "we.sets",
            "we.reps"
        )
        .where({ workout_id: workout.workout_id })
        
        return {
            ...workout,
            exercises: exercises
        }
    })); 

    return await workoutList;
};
