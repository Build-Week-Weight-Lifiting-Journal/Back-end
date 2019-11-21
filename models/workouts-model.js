const db = require('../config/db-config.js');

module.exports = {
    addExercise,
    findById,
    findAll,
    findUserWorkouts,
    remove,
    edit
};

// Add an exercise to a workout
async function addExercise(workoutData, workout_id) {
    const exercise = await db('exercises')
            .where({name: workoutData.name})
            .first();
    
    if (exercise) {
        // If exercises exists add it to the workout in the WE table
        await db('workouts_exercises')
            .insert({
                reps: workoutData.reps,
                sets: workoutData.sets,
                workout_id: workout_id,
                exercise_id: exercise.id
            })   
    } else {
        // if it doesn't exist, add it to the exercises table
        // THEN add it to the WE table
        const [ id ] = await db('exercises')
            .insert({ 
                name: workoutData.name,  
                region: workoutData.region
            });

        await db('workouts_exercises')
            .insert({
                reps: workoutData.reps,
                sets: workoutData.sets,
                workout_id: workout_id,
                exercise_id: id
            })   
    };
                
    return await findById(workout_id);
};

// Find a workout by it's ID
async function findById(workout_id){
    // Find the workout associated with the workout ID
    const workout = await db('workouts as w')
        .select(
            'w.id as workout_id', 
            'w.name as workout_name', 
            )
        .where({ workout_id })
        .first();

    // Find the exercises associated with that workout 
    if (workout) {
        const exercises = await db('workouts_exercises as we')
            .join("workouts as w", "we.workout_id", "w.id")
            .join("exercises as e", "we.exercise_id", "e.id")
            .select(
                "we.id as user_exercise_id",
                "e.id as exercise_id",
                "e.name as exercise_name",
                "e.region",
                "we.sets",
                "we.reps"
            )
            .where({ workout_id })
        
        // Return an object containing the workout, and a list of the exercises
        return {
            ...workout,
            exercises: exercises
        }
    }
};

// Find ALL workouts that exist
function findAll(){
    return db('workouts')
};

// Find ALL workouts associated with a user
async function findUserWorkouts(user_id) {
    // Get all workouts associated with a user ID
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

    // An array of objects containing: workouts, and list of exercises for each workout
    const workoutList = await Promise.all(workouts.map(async workout => {
        // This is a list of exercises specific to the workout ID
        // Which is added into the returned object
        let exercises = await db('workouts_exercises as we')
        .join("workouts as w", "we.workout_id", "w.id")
        .join("exercises as e", "we.exercise_id", "e.id")
        .select(
            "we.id as user_exercise_id",
            "e.id as exercise_id",
            "e.name as exercise_name",
            "e.region",
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

// Delete a workout
function remove(id) {
    return db('workouts')
            .where({id})
            .first()
            .del()
}

// Edit a workout's name
function edit(changes, id) {
    return db('workouts')
            .where({id})
            .first()
            .update(changes)
}
